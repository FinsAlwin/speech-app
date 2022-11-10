import React, { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "./config";
import { isNotifications, setNotificationMessage } from "./redux/User/action";
// import io from "socket.io-client";

// const socket = new WebSocket(`${SOCKET_URL}`);

function App() {
  const dispatch = useDispatch();
  const routing = useRoutes(Themeroutes);
  // const { user } = useSelector((state) => state.user);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    socket.onopen = () => {
      console.log("Successfully Connected");
      socket.send("Hi From the Client!");
    };

    socket.onclose = (event) => {
      console.log("Socket Closed Connection: ", event);
      socket.send("Client Closed!");
    };

    socket.onerror = (error) => {
      console.log("Socket Error: ", error);
    };

    socket.onmessage = async (e) => {
      const obj = JSON.parse(e.data);
      // const data = JSON.parse(obj.body);

      if (obj.type == 2) {
        notification(obj);
      }
    };
  }, [socket]);

  async function notification(data) {
    const dataBody = JSON.parse(data.body);

    if (dataBody.userId == user.id && user.userType == 0) {
      await dispatch(isNotifications());
      await dispatch(setNotificationMessage(dataBody));
    }
  }

  return <div className="dark">{routing}</div>;
}

export default App;
