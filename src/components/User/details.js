import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import CallBox from "./call";
import { useSelector, useDispatch } from "react-redux";

import "./style.css";

const Details = () => {
  const [call, setCall] = useState(false);
  const { isNotifications, notification_message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isNotifications) {
      setCall(true);
    }
  }, [isNotifications]);

  const handleCall = () => {
    if (call) {
      setCall(false);
    } else {
      setCall(true);
    }
  };

  const handleClose = () => setCall(false);
  const handleShow = () => setCall(true);

  return (
    <>
      <Modal size="sm" centered show={call}>
        <div className="callContainer shadow">
          <CallBox data={notification_message} />
        </div>
      </Modal>
      <div className="detailsContainer shadow"></div>
    </>
  );
};

export default Details;
