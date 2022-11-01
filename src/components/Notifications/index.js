import React from "react";
import { Container, Button, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const NotificationMenu = (props) => {
  const { user, notification_message, isNotifications } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const handleOpenLink = () => {
    window.open(props.data.link);
  };
  return (
    <Container>
      {isNotifications && (
        <>
          <div style={{ marginTop: "20px" }}>
            <Toast>
              <Toast.Body>
                <a href={props.data.link}>{props.data.message}</a>
              </Toast.Body>
            </Toast>
          </div>
        </>
      )}
    </Container>
  );
};

export default NotificationMenu;
