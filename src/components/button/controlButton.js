import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";
const ControlButton = (props) => {
  const handleClick = () => {
    props.click();
  };

  return (
    <>
      <div
        className={`controlButton shadow-lg ${props.bgColor}`}
        onClick={() => handleClick(props.type)}
        style={{ width: `${props.width}`, height: `${props.height}` }}
      >
        <FontAwesomeIcon icon={props.icon} color={props.iconColor} />
      </div>
    </>
  );
};

export default ControlButton;
