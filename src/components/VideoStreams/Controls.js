import React, { useState } from "react";
import {
  faCamera,
  faPhoneSlash,
  faVolumeUp,
  faVolumeMute,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import ControlButton from "../button/controlButton";

const Control = (props) => {
  const [camera, setCamera] = useState(true);
  const [audio, setAudio] = useState(true);
  const [render, setRender] = useState(false);

  const handleAudio = () => {
    if (audio) {
      setAudio(false);
      props.click("audio");
    } else {
      setAudio(true);
      props.click("audio");
    }
  };

  const handleCamera = () => {
    if (camera) {
      setCamera(false);
      props.click("camera");
    } else {
      setCamera(true);
      props.click("camera");
    }
  };

  const handleRender = () => {
    if (render) {
      setRender(false);
      props.click(1);
    } else {
      setRender(true);
      props.click(1);
    }
  };
  return (
    <>
      <div className="buttonContainer">
        {/* <ControlButton
          icon={faCamera}
          bgColor={camera ? "bg-color-opacity" : "bg-color-red"}
          click={handleCamera}
          height={props.size}
          width={props.size}
          iconColor={"white"}
        />
        &nbsp;
        <ControlButton
          icon={audio ? faVolumeUp : faVolumeMute}
          bgColor={audio ? "bg-color-opacity" : "bg-color-red"}
          click={handleAudio}
          height={props.size}
          width={props.size}
          iconColor={"white"}
        />
        &nbsp; */}
        {/* <ControlButton
          icon={render ? faVolumeUp : faVolumeMute}
          bgColor={render ? "bg-color-opacity" : "bg-color-red"}
          click={handleRender}
          height={props.size}
          width={props.size}
        />
        &nbsp; */}
      </div>
    </>
  );
};

export default Control;
