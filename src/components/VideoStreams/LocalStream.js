import React, { useState, useEffect, useRef } from "react";
import Control from "./Controls";
import "./style.css";

const LocalStream = (props) => {
  const [camera, setCamera] = useState(true);
  const [audio, setAudio] = useState(false);
  const [call, setCall] = useState(true);

  const localCamRef = useRef(null);

  useEffect(() => {
    if (call) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          localCamRef.current.srcObject = stream;

          localCamRef.current.play();
          props.testStream(stream);
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

  const handleClick = (e) => {
    if (e == "audio") {
      if (audio) {
        setAudio(false);
        localCamRef.current.muted = true;
      } else {
        setAudio(true);
        localCamRef.current.muted = false;
      }
    } else if (e == "camera") {
      if (camera) {
        setCamera(false);
        localCamRef.current.hidden = true;
      } else {
        setCamera(true);
        localCamRef.current.hidden = false;
      }
    }
  };

  return (
    <>
      <div
        className="localStreamContainer shadow"
        style={{ width: props.width, height: props.height }}
      >
        <video
          ref={localCamRef}
          className="video-player"
          id="user-1"
          autoPlay
          playsInline
        ></video>
        <Control size="30px" isLocal={true} click={handleClick} />
      </div>
    </>
  );
};

export default LocalStream;
