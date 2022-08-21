import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const ENDPOINT = `${process.env.REACT_APP_BASE_URL}`;

export default function NotificationSocket() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = io(ENDPOINT);

    console.log(
      socket.on("firstEvent", (msj) => {
        console.log(msj);
      })
    );
    socket.on(
      "FromAPI",
      (data) => {
        setResponse(data);
      },
      []
    );

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
