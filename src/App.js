import React, { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import { useSelector, useDispatch } from "react-redux";
import { SOCKET_URL } from "./config";
import { isNotifications, setNotificationMessage } from "./redux/User/action";
import io from "socket.io-client";

const socket = io(`${SOCKET_URL}`);

function App() {
  const dispatch = useDispatch();
  const routing = useRoutes(Themeroutes);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    socket.on("connection", (client) => {
      console.log("a user connected");
      client.on("disconnect", () => {
        console.log("user disconnected");
      });
    });

    socket.on("notification", notification);
  }, [socket]);

  async function notification(data) {
    await dispatch(isNotifications());
    await dispatch(setNotificationMessage(data));
  }

  return <div className="dark">{routing}</div>;
}

export default App;
