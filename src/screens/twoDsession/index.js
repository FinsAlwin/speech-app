import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import { Row, Col } from "react-bootstrap";
import LocalStream from "./../../components/VideoStreams/LocalStream";
import LeftMenu from "../../components/AdminVideoCall/LeftMenu";
import { Fireworks } from "@fireworks-js/react";
import ControlBox from "./controlBox";
import bg from "../../images/bg.jpg";
import { BASE_URL, SOCKET_URL } from "../../config";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";

const socket = io(`${SOCKET_URL}`);

let APP_ID = "7d1754924930464fb10e4130707ee1d6";

let token = null;
let uid = String(Math.floor(Math.random() * 10000));

let client;
let channel;
let remoteStream;
let peerConnection;

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

const {
  Application,
  live2d: { Live2DModel },
} = window.PIXI;

const {
  Face,
  Vector: { lerp },
  Utils: { clamp },
} = window.Kalidokit;

// Url to Live2D

const videoElement = document.querySelector(".input_video"),
  guideCanvas = document.querySelector("canvas.guides");

let currentModel, facemesh, facemeshT;

let initialMinute = 0;
let initialSeconds = 0;

const TwoDSession = () => {
  const { isNotifications, notification_message } = useSelector(
    (state) => state.user
  );

  const modelUrl = `${BASE_URL}${notification_message.modelUrl}`;
  const remoteCamRef = useRef(null);
  // const remoteCamRef2 = useRef(null);
  const canvasRef = useRef(null);
  const [isFireworkActive, setIsFireworkActive] = useState(false);
  const [isCall, setCall] = useState(false);
  const [callMode, setCallMode] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  // const [remoteStream, setRemoteStream] = useState();
  const [localStream, setLocalStream] = useState();
  const [stream, setStream] = useState();
  let { sessionId } = useParams();
  const connect = window.drawConnectors;

  const [time, setTime] = useState(0);
  const [isFace, setIsFace] = useState(false);
  const [audio, setAudio] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isFace) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isFace]);

  useEffect(() => {
    socket.on("firework", firework);
  });

  useEffect(() => {
    async function getWrtc() {
      if (localStream) {
        client = window.AgoraRTM.createInstance(APP_ID, {
          enableLogUpload: true,
        }); // Pass your App ID here.
        await client.login({ uid, token });

        channel = client.createChannel(sessionId);
        await channel.join();

        channel.on("MemberJoined", handleUserJoined);
        channel.on("MemberLeft", async () => {
          // console.log(channel);
          // handleUserLeft();
        });

        client.on("MessageFromPeer", handleMessageFromPeer);
      }
    }
    getWrtc();
  }, [localStream]);

  // useEffect(() => {
  //   // if (remoteStream.active) remoteStream.onactive = onactive();
  //   console.log(remoteStream);
  // }, [remoteStream]);

  async function onactive() {
    runModal();
    // console.log(remoteStream);
  }

  const handleTestStream = (e) => {
    // setRemoteStream(e);
    setLocalStream(e);
  };

  const firework = (data) => {
    setIsFireworkActive(data);
  };

  const handleUserLeft = (MemberId) => {
    document.getElementById("user-2").style.display = "none";
    document.getElementById("user-1").classList.remove("smallFrame");
  };

  const handleMessageFromPeer = async (message, MemberId) => {
    message = JSON.parse(message.text);

    if (message.type === "offer") {
      createAnswer(MemberId, message.offer);
    }

    if (message.type === "answer") {
      addAnswer(message.answer);
    }

    if (message.type === "candidate") {
      if (peerConnection) {
        peerConnection.addIceCandidate(message.candidate);
      }
    }
  };

  const handleUserJoined = async (MemberId) => {
    console.log("A new user joined the channel:", MemberId);
    createOffer(MemberId);
  };

  const createPeerConnection = async (MemberId) => {
    peerConnection = new RTCPeerConnection(servers);

    remoteStream = new MediaStream();

    remoteCamRef.current.srcObject = remoteStream;

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
        remoteStream.onactive = onactive();
      });
    };

    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        client.sendMessageToPeer(
          {
            text: JSON.stringify({
              type: "candidate",
              candidate: event.candidate,
            }),
          },
          MemberId
        );
      }
    };
  };

  const createOffer = async (MemberId) => {
    await createPeerConnection(MemberId);

    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    client.sendMessageToPeer(
      { text: JSON.stringify({ type: "offer", offer: offer }) },
      MemberId
    );
  };

  const createAnswer = async (MemberId, offer) => {
    await createPeerConnection(MemberId);

    await peerConnection.setRemoteDescription(offer);

    let answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    client.sendMessageToPeer(
      { text: JSON.stringify({ type: "answer", answer: answer }) },
      MemberId
    );
  };

  const addAnswer = async (answer) => {
    if (!peerConnection.currentRemoteDescription) {
      peerConnection.setRemoteDescription(answer);
    }
  };

  const onResults = (results) => {
    animateLive2DModel(results.multiFaceLandmarks[0]);
  };

  const animateLive2DModel = (points) => {
    if (!currentModel || !points) return;

    let riggedFace;

    if (points) {
      // use kalidokit face solver
      riggedFace = Face.solve(points, {
        runtime: "mediapipe",
        video: document.querySelector(".input_video"),
      });
      rigFace(riggedFace, 0.5);
    }
  };

  // update live2d model internal state
  const rigFace = (result, lerpAmount = 0.7) => {
    const coreModel = currentModel.internalModel.coreModel;

    currentModel.internalModel.motionManager.update = (...args) => {
      // disable default blink animation
      currentModel.internalModel.eyeBlink = undefined;

      coreModel.setParameterValueById(
        "ParamEyeBallX",
        lerp(
          result.pupil.x,
          coreModel.getParameterValueById("ParamEyeBallX"),
          lerpAmount
        )
      );
      coreModel.setParameterValueById(
        "ParamEyeBallY",
        lerp(
          result.pupil.y,
          coreModel.getParameterValueById("ParamEyeBallY"),
          lerpAmount
        )
      );

      // X and Y axis rotations are swapped for Live2D parameters
      // because it is a 2D system and KalidoKit is a 3D system
      coreModel.setParameterValueById(
        "ParamAngleX",
        lerp(
          result.head.degrees.y,
          coreModel.getParameterValueById("ParamAngleX"),
          lerpAmount
        )
      );
      coreModel.setParameterValueById(
        "ParamAngleY",
        lerp(
          result.head.degrees.x,
          coreModel.getParameterValueById("ParamAngleY"),
          lerpAmount
        )
      );
      coreModel.setParameterValueById(
        "ParamAngleZ",
        lerp(
          result.head.degrees.z,
          coreModel.getParameterValueById("ParamAngleZ"),
          lerpAmount
        )
      );

      // update body params for models without head/body param sync
      const dampener = 0.3;
      coreModel.setParameterValueById(
        "ParamBodyAngleX",
        lerp(
          result.head.degrees.y * dampener,
          coreModel.getParameterValueById("ParamBodyAngleX"),
          lerpAmount
        )
      );
      coreModel.setParameterValueById(
        "ParamBodyAngleY",
        lerp(
          result.head.degrees.x * dampener,
          coreModel.getParameterValueById("ParamBodyAngleY"),
          lerpAmount
        )
      );
      coreModel.setParameterValueById(
        "ParamBodyAngleZ",
        lerp(
          result.head.degrees.z * dampener,
          coreModel.getParameterValueById("ParamBodyAngleZ"),
          lerpAmount
        )
      );

      // Simple example without winking.
      // Interpolate based on old blendshape, then stabilize blink with `Kalidokit` helper function.
      let stabilizedEyes = window.Kalidokit.Face.stabilizeBlink(
        {
          l: lerp(
            result.eye.l,
            coreModel.getParameterValueById("ParamEyeLOpen"),
            0.7
          ),
          r: lerp(
            result.eye.r,
            coreModel.getParameterValueById("ParamEyeROpen"),
            0.7
          ),
        },
        result.head.y
      );
      // eye blink
      coreModel.setParameterValueById("ParamEyeLOpen", stabilizedEyes.l);
      coreModel.setParameterValueById("ParamEyeROpen", stabilizedEyes.r);

      // mouth
      coreModel.setParameterValueById(
        "ParamMouthOpenY",
        lerp(
          result.mouth.y,
          coreModel.getParameterValueById("ParamMouthOpenY"),
          0.3
        )
      );
      // Adding 0.3 to ParamMouthForm to make default more of a "smile"
      coreModel.setParameterValueById(
        "ParamMouthForm",
        0.3 +
          lerp(
            result.mouth.x,
            coreModel.getParameterValueById("ParamMouthForm"),
            0.3
          )
      );
    };
  };

  async function runModal() {
    if (user.userType == 0 && remoteStream?.active) {
      // create pixi application
      const app = new window.PIXI.Application({
        view: document.getElementById("live2d"),
        autoStart: true,
        backgroundAlpha: 1,
        backgroundColor: 0xffffff,
        resizeTo: window,
      });

      var background = window.PIXI.Sprite.fromImage(
        `${BASE_URL}${notification_message.backGroundUrl}`
      );

      background.width = window.innerWidth;
      background.height = window.innerHeight;
      app.stage.addChild(background);

      // load live2d model
      currentModel = await Live2DModel.from(modelUrl, {
        autoInteract: true,
      });
      console.log(currentModel);
      currentModel.scale.set(0.4);
      currentModel.interactive = true;
      currentModel.anchor.set(0.55, 0.55);
      currentModel.position.set(
        window.innerWidth * 0.5,
        window.innerHeight * 1.5
      );

      // Add mousewheel events to scale model
      document.querySelector("#live2d").addEventListener("wheel", (e) => {
        e.preventDefault();
        currentModel.scale.set(
          clamp(currentModel.scale.x + e.deltaY * -0.001, -0.5, 10)
        );
      });

      // add live2d model to stage
      app.stage.addChild(currentModel);

      facemesh = new window.FaceMesh({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
        },
      });

      // set facemesh config
      facemesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      // pass facemesh callback function
      facemesh.onResults(onResults);

      async function onFrame() {
        if (!remoteCamRef?.current.paused && !remoteCamRef?.current?.ended) {
          await facemesh.send({
            image: remoteCamRef.current,
          });
          await new Promise(requestAnimationFrame);
          onFrame();
        } else setTimeout(onFrame, 500);
      }

      onFrame();
    } else if (user.userType == 1 && remoteStream?.active) {
      facemeshT = new window.FaceMesh({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
        },
      });

      // set facemesh config
      facemeshT.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      // pass facemesh callback function
      facemeshT.onResults(onResultsA);

      async function onFrameA() {
        if (!remoteCamRef?.current.paused && !remoteCamRef?.current?.ended) {
          await facemeshT.send({
            image: remoteCamRef.current,
          });
          await new Promise(requestAnimationFrame);
          onFrameA();
        } else setTimeout(onFrameA, 500);
      }
      onFrameA();
    }
  }

  const handleCall = (e) => {
    setCall(e);
  };

  const handleCallMode = (e) => {
    setCallMode(e);
  };

  const onResultsA = (results) => {
    if (results.multiFaceLandmarks.length) {
      setIsFace(true);
    } else {
      setIsFace(false);
    }
  };

  const handleAudio = (e) => {
    setAudio(e);
    console.log(audio);
  };

  return (
    <>
      <Row>
        {user.userType == 1 && (
          <Col lg="1">
            <LeftMenu call={handleCall} callMode={handleCallMode} />
          </Col>
        )}

        <Col lg={user.userType == 1 ? "6" : "12"}>
          <div className="boxPublic shadow">
            <LocalStream
              width={200}
              height={100}
              testStream={handleTestStream}
              audio={audio}
            />

            <video
              className="video-player-remote"
              id="user-2"
              ref={remoteCamRef}
              autoPlay
              muted={true}
              playsInline
              style={{
                visibility: `${user.userType == 0 && "hidden"}`,
                position: `${user.userType == 0 && "absolute"}`,
              }}
            ></video>

            <canvas className="guides" ref={canvasRef}></canvas>

            {user.userType == 0 && (
              <>
                {isFireworkActive && (
                  <Fireworks
                    options={{
                      rocketsPoint: {
                        min: 0,
                        max: 100,
                      },
                    }}
                    style={{
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                    }}
                  />
                )}

                <canvas className="threedrenderCanvas2" id="live2d"></canvas>
              </>
            )}
          </div>
        </Col>

        {user.userType == 1 && (
          <Col lg="5">
            <ControlBox time={time} handleAudio={handleAudio} />
          </Col>
        )}
      </Row>
    </>
  );
};

export default TwoDSession;
