import React, { useState } from "react";
import {
  faHome,
  faBell,
  faCommentDots,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ControlButton from "../../button/controlButton";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../../redux/User/action";
import { Container, Row, Col, Modal } from "react-bootstrap";

import "./style.css";

const LeftMenu = (props) => {
  const dispatch = useDispatch();
  const [chat, setChat] = useState(false);
  const [notification, setNotification] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/home");
  };

  const handleCall = (e) => {
    props.call(e);
  };

  const handleCallMode = (e) => {
    props.callMode(e);
  };

  const handleNotification = () => {
    // if (notification) {
    //   setNotification(false);
    // } else {
    //   setNotification(true);
    // }
  };

  const handleProfile = () => {};

  const handleChat = () => {
    // if (chat) {
    //   setChat(false);
    // } else {
    //   setChat(true);
    // }
  };

  const handleCloseNotification = () => setNotification(false);

  const handleLogOut = async () => {
    const res = await dispatch(signout());
    if (res) {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="boxA shadow">
        <div className="adminLefpanelContainer">
          <div>
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
              height="40px"
              width="40px"
              iconColor="#b3e820"
            />
            &nbsp;
            <ControlButton
              icon={faBell}
              bgColor={"bg-color-opacity"}
              click={handleNotification}
              height="40px"
              width="40px"
              iconColor="#b3e820"
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
        </div>
      </div>
    </>
  );
};

export default LeftMenu;
