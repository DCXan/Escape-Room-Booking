import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
const ENDPOINT = `${process.env.REACT_APP_BASE_URL}`;
const socket = io(ENDPOINT);

export default function NotificationSocket() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handler = (notifications) => {
      setNotifications([...notifications, notifications]);
    };

    socket.on("changes", handler);

    return () => socket.off("changes", handler);
  }, [notifications]);

  useEffect(() => {
    const handler = (notifications) => {
      setNotifications((notifications) => [...notifications, notifications]);
    };

    socket.on("changes", handler);

    return () => socket.off("changes", handler);
  }, []);

  console.log(notifications);

  return <p>Notifications</p>;
}
