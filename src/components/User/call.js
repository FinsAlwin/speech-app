import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faPhoneSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const CallBox = (props) => {
  const navigate = useNavigate();

  const handleCall = () => {
    navigate(`${props.data.link}`);
  };

  return (
    <div>
      <h4>Calling...</h4>
      <div className="callContainer">
        <div className="callButtonGreen" onClick={handleCall}>
          <FontAwesomeIcon icon={faPhone} color="white" />
        </div>
        {/* &nbsp;
        <div className="callButtonRed">
          <FontAwesomeIcon icon={faPhoneSlash} color="white" />
        </div> */}
      </div>
    </div>
  );
};

export default CallBox;
