import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import LoginForm from "./loginForm";
import "./style.css";

const Login = () => {
  return (
    <>
      <Container>
        <Row>
          <Col lg={6}></Col>
          <Col lg={6}>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
