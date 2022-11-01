import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu/index";
import MainScreen from "./MainScreen";
const AdminVideoCall = () => {
  const [isCall, setCall] = useState(false);
  const [callMode, setCallMode] = useState();

  const handleCall = (e) => {
    setCall(e);
  };

  const handleCallMode = (e) => {
    setCallMode(e);
  };
  return (
    <>
      <Container>
        <Row>
          <Col lg="3">
            <LeftMenu call={handleCall} callMode={handleCallMode} />
          </Col>
          <Col lg="6">
            <MainScreen isCall={isCall} callMode={callMode} />
          </Col>
          <Col lg="3">
            <RightMenu />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminVideoCall;
