import React, { useState, useEffect, useRef } from "react";
import { Card, Button } from "react-bootstrap";
import {
  faCamera,
  faPhoneSlash,
  faVolumeUp,
  faVolumeMute,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import ControlButton from "../../button/controlButton";

const LocalStream = (props) => {
  const [camera, setCamera] = useState(true);
  const [audio, setAudio] = useState(true);
  const [call, setCall] = useState(true);

  const localCamRef = useRef(null);

  useEffect(() => {
    if (call) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          localCamRef.current.srcObject = stream;
          localCamRef.current.play();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      localCamRef.current.srcObject.getTracks().forEach(function (track) {
        track.stop();
      });
    }
  }, []);

  const handleCamera = () => {
    if (camera) {
      setCamera(false);
      localCamRef.current.hidden = true;
    } else {
      setCamera(true);
      localCamRef.current.hidden = false;
    }
  };

  const handleAudio = () => {
    if (audio) {
      setAudio(false);
      localCamRef.current.muted = true;
    } else {
      setAudio(true);
      localCamRef.current.muted = false;
    }
  };

  const handleCall = () => {
    localCamRef.current.srcObject.getTracks().forEach(function (track) {
      track.stop();
    });

    // setCall(false);
    // props.setMakeCall(false);
  };

  return (
    <>
      {call && (
        <div className="localStreamContainer shadow">
          <video
            ref={localCamRef}
            className="video-player"
            id="user-1"
            autoPlay
            playsInline
          ></video>
          <div className="buttonContainer">
            <ControlButton
              icon={faCamera}
              bgColor={camera ? "bg-color-opacity" : "bg-color-red"}
              click={handleCamera}
              height="30px"
              width="30px"
            />
            &nbsp;
            <ControlButton
              icon={audio ? faVolumeUp : faVolumeMute}
              bgColor={audio ? "bg-color-opacity" : "bg-color-red"}
              click={handleAudio}
              height="30px"
              width="30px"
            />
            &nbsp;
            {/* <ControlButton
              icon={faPhoneSlash}
              bgColor={"bg-color-red"}
              click={() => {
                handleCall();
                setCall(false);
                props.setMakeCall(false);
              }}
              height="30px"
              width="30px"
            /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default LocalStream;
