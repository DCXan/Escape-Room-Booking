import React, { useState, useEffect } from "react";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8000";

export default function NotificationSocket() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //
  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}
