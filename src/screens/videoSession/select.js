import React, { useState } from "react";
import {
  Container,
  Button,
  Modal,
  Tabs,
  Tab,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import { ModelData, BackGroundData } from "../../data/Items";
import { BASE_URL, socket } from "../../config";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
// const socket = new WebSocket(`${SOCKET_URL}`);

const Select = (props) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [background, setBackground] = useState();
  const [model, setModel] = useState();
  const handleClose = () => props.handleClose();
  const handleShow = () => props.handleShow();

  const handleSelectBackground = (id) => {
    setBackground(id);
  };

  const handleSelectModel = (id) => {
    setModel(id);
  };

  const randomNumber = String(Math.floor(Math.random() * 10000));
  const handleCreateSession = async () => {
    if (background && model) {
      const payload = JSON.stringify({
        userId: props.clientData.id,
        username: props.clientData.username,
        peerId: user.id,
        message: "New session created",
        link: `/video-sessions/${user.username}.${props.clientData.username}.${randomNumber}`,
        modelUrl: filterById(ModelData, model).modelUrl,
        backGroundUrl: filterById(BackGroundData, background).url,
      });

      // await socket.emit("chatNotications", payload);

      await socket.send(payload);

      navigate(
        `/video-sessions/${user.username}.${props.clientData.username}.${randomNumber}`
      );
    } else {
      console.log("Please background and Model");
    }
  };

  function filterById(jsonObject, id) {
    return jsonObject.filter(function (jsonObject) {
      return jsonObject["id"] == id;
    })[0];
  }

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Container>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="bg" title="Select Background">
              <div className="tabContainer">
                <Row>
                  {BackGroundData.map((item, index) => (
                    <Col lg={4} key={index}>
                      <div
                        className={`tabImageContainer ${
                          background === item.id && "onActiveTab"
                        }`}
                        onClick={() => handleSelectBackground(item.id)}
                      >
                        <Image fluid rounded src={BASE_URL + item.url} />
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Tab>
            <Tab eventKey="model" title="Select 2D models">
              <div className="tabContainer">
                <Row>
                  {ModelData.map((item, index) => (
                    <Col lg={4} key={index}>
                      <div
                        className={`tabImageContainer ${
                          model === item.id && "onActiveTab"
                        }`}
                        onClick={() => handleSelectModel(item.id)}
                      >
                        <Image fluid rounded src={BASE_URL + item.sampleUrl} />
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Tab>
          </Tabs>
        </Container>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateSession}>
            Create Session
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Select;
