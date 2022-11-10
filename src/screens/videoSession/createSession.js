import React, { useState } from "react";
import { Form, Button, Modal, Tabs, Tab } from "react-bootstrap";
import { UserData } from "../../data/User";
import { useNavigate } from "react-router-dom";
import Select from "./select";
import io from "socket.io-client";
import { socket } from "../../config";
// const socket = new WebSocket(`${SOCKET_URL}`);

const CreateSession = (props) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [videoCallType, setVideoCallType] = useState("form");
  const [userId, setUserId] = useState(props.selectedUserId);
  const [clientData, setClientData] = useState(
    filterById(UserData, props.selectedUserId)
  );

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const randomNumber = String(Math.floor(Math.random() * 10000));
  const handleCreateSession = async () => {
    const payload = {
      userId: clientData.id,
      username: clientData.username,
      peerId: user.id,
      message: "New session created",
      link: `/video-sessions/${user.username}.${clientData.username}.${randomNumber}`,
    };
    await socket.emit("chatNotications", payload);

    navigate(
      `/video-sessions/${user.username}.${clientData.username}.${randomNumber}`
    );
  };

  function filterById(jsonObject, id) {
    return jsonObject.filter(function (jsonObject) {
      return jsonObject["id"] == id;
    })[0];
  }

  return (
    <>
      <Select
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        clientData={clientData}
      />
      <div className="formSession">
        <span>
          <h4>User Id : {props.selectedUserId}</h4>
        </span>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Video Calll Mode</Form.Label>
            <Form.Select as="select" custom>
              {/* <option value="normalMode">Normal mode</option> */}
              <option value="2dmode">2D Mode</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" onClick={() => setShow(true)}>
            Next
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CreateSession;
