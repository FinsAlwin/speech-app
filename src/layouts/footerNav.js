import React, { useState } from "react";
import {
  faHome,
  faBell,
  faCommentDots,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ControlButton from "../components/button/controlButton";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import ChatMenu from "./../components/Chat/index";
import NotificationMenu from "./../components/Notifications/index";
import { signout } from "../redux/User/action";

const FooterNav = () => {
  const dispatch = useDispatch();
  const [chat, setChat] = useState(false);
  const [notification, setNotification] = useState(false);
  const { user, notification_message, isNotifications } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/home");
  };

  const handleChat = () => {
    // if (chat) {
    //   setChat(false);
    // } else {
    //   setChat(true);
    // }
  };

  const handleNotification = () => {
    // if (notification) {
    //   setNotification(false);
    // } else {
    //   setNotification(true);
    // }
  };

  const handleClose = () => setChat(false);
  const handleShow = () => setChat(true);

  const handleCloseNotification = () => setNotification(false);

  const handleLogOut = async () => {
    const res = await dispatch(signout());
    if (res) {
      navigate("/login");
    }
  };

  const handleProfile = () => {};

  return (
    <>
      <Modal size="sm" centered show={chat} onHide={handleClose}>
        <div className="chatContainer shadow">
          <ChatMenu />
        </div>
      </Modal>
      <Modal
        size="sm"
        centered
        show={notification}
        onHide={handleCloseNotification}
      >
        <div className="notificationContainer shadow">
          <NotificationMenu data={notification_message} />
        </div>
      </Modal>
      <div className="footerUser">
        <Container>
          <Row>
            <Col lg="4">
              <div>
                {user?.firstname} {user?.lastname}
              </div>
              <div>{user?.email}</div>
            </Col>
            <Col lg="4">
              <div className="footerNav ">
                <ControlButton
                  icon={faUser}
                  bgColor={"bg-color-opacity"}
                  click={handleProfile}
                  height="40px"
                  width="40px"
                  iconColor="#0096FF"
                />
                &nbsp;
                <ControlButton
                  icon={faCommentDots}
                  bgColor={"bg-color-opacity"}
                  click={handleChat}
                  height="40px"
                  width="40px"
                  iconColor="#b3e820"
                />
                &nbsp;
                <ControlButton
                  icon={faHome}
                  bgColor={"bg-color-opacity"}
                  click={handleHome}
                  height="50px"
                  width="50px"
                  iconColor="#b3e820"
                />
                &nbsp;
                <ControlButton
                  icon={faBell}
                  bgColor={"bg-color-opacity"}
                  click={handleNotification}
                  height="40px"
                  width="40px"
                  iconColor={"#b3e820"}
                />
                &nbsp;
                <ControlButton
                  icon={faSignOut}
                  bgColor={"bg-color-opacity"}
                  click={handleLogOut}
                  height="40px"
                  width="40px"
                  iconColor="crimson"
                />
                &nbsp;
              </div>
            </Col>
            <Col lg="4">
              {/* <div className="notificatrionContainer shadow">
                <div className="notificationIcon">
                  <FontAwesomeIcon icon={faBell} color="#b3e820" />
                </div>
              </div> */}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FooterNav;
