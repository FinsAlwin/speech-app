import React, { useState } from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
const Chat = () => {
  const [demoChat, setDemoChat] = useState();
  return (
    <>
      <div className="d-flex justify-content-center">
        <h5>Chat</h5>
      </div>
      <Container>
        <div className="chatBox">
          <div className="chatInput d-flex">
            <input type="text" />
            &nbsp;
            <Button>Send</Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Chat;
