import React from "react";
import { Row, Col } from "react-bootstrap";
import LeftMenu from "../../components/AdminVideoCall/LeftMenu";
import VideoSessionContainer from "./videoSession";
import "./style.css";

const VideoSession = () => {
  return (
    <>
      <Row>
        <Col lg="1">
          <LeftMenu />
        </Col>
        <Col lg="11">
          <VideoSessionContainer />
        </Col>
      </Row>
    </>
  );
};

export default VideoSession;
