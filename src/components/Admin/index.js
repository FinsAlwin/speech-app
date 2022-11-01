import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LeftMenu from "../AdminVideoCall/LeftMenu";
import RightMenu from "../AdminVideoCall/RightMenu";
import MainScreen from "../AdminVideoCall/MainScreen";

const Admin = () => {
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
      <Row>
        <Col lg="1">
          <LeftMenu />
        </Col>
        <Col lg="11">
          <MainScreen />
        </Col>
        {/* <Col lg="2">
          <RightMenu />
        </Col> */}
      </Row>
    </>
  );
};

export default Admin;
