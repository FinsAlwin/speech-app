import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBurn,
  faVolumeUp,
  faVolumeMute,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";
import { Row, Col, Container } from "react-bootstrap";
import { SOCKET_URL } from "../../config";

const socket = io(`${SOCKET_URL}`);

const ControlBox = (props) => {
  const [reinforcement, setReinforcement] = useState(false);
  const [audio, setAudio] = useState(false);
  const [camera, setCamera] = useState(false);

  useEffect(() => {
    if (reinforcement) {
      setTimeout(() => {
        setReinforcement(false);
      }, 10000);
    } else {
      socket.emit("firework", false);
    }
  });

  const handleReinforcement = () => {
    if (reinforcement) {
      setReinforcement(false);
    } else {
      setReinforcement(true);
      socket.emit("firework", true);
    }
  };

  const handleAudio = () => {
    if (audio) {
      setAudio(false);
      props.handleAudio(false);
    } else {
      setAudio(true);
      props.handleAudio(true);
    }
  };

  const handleCamera = () => {
    if (camera) {
      setCamera(false);
    } else {
      setCamera(true);
    }
  };
  return (
    <>
      <div className="controlBox shadow">
        <Container>
          &nbsp;
          <Row>
            {/* <Col lg={6}>
              <div
                className="cardMenuSession shadow"
                onClick={handleAudio}
                style={{
                  backgroundColor: `${audio ? "#AED6F1" : "#3498DB"}`,
                }}
              >
                <FontAwesomeIcon icon={faVolumeUp} color={"white"} size="2xl" />
              </div>
            </Col>
            <Col lg={6}>
              <div
                className="cardMenuSession shadow"
                onClick={handleCamera}
                style={{
                  backgroundColor: `${camera ? "#AED6F1" : "#3498DB"}`,
                }}
              >
                <FontAwesomeIcon icon={faCamera} color={"white"} size="2xl" />
              </div>
            </Col> */}
          </Row>
          &nbsp;
          <Row>
            <Col lg={6}>
              <div
                className="cardMenuSession shadow"
                onClick={handleReinforcement}
                style={{
                  backgroundColor: `${reinforcement ? "#AED6F1" : "#3498DB"}`,
                }}
              >
                <FontAwesomeIcon icon={faBurn} color={"white"} size="2xl" />
              </div>
            </Col>
            <Col lg={6}>
              <div
                className="cardMenuSession shadow"
                onClick={handleReinforcement}
                style={{
                  backgroundColor: `#7393B3`,
                }}
              >
                <div className="timer">
                  <span className="digits">
                    {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
                  </span>
                  <span className="digits">
                    {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
                  </span>
                  <span className="digits mili-sec">
                    {("0" + ((props.time / 10) % 100)).slice(-2)}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ControlBox;
