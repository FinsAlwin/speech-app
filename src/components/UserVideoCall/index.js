import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import "./style.css";
import Control from "../VideoStreams/Controls";
import LocalStream from "../VideoStreams/LocalStream";

const User = () => {
  const [mode, setmode] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);
  return (
    <>
      <div className="remoteContainer shadow">
        <LocalStream width="200px" height="140px" />
        {!isCallActive && (
          <div className="spinnerContainer">
            <Spinner animation="border" variant="light" />
          </div>
        )}

        <Control size="50px" isLocal={false} />
      </div>
    </>
  );
};

export default User;
