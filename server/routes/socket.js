const express = require("express");
const notificationRouter = express.Router();
const server = require("http").createServer(notificationRouter);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
const socket = require("socket.io");

notificationRouter.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

notificationRouter.post("/notify", (req, res) => {
  const Notify = { data: req.body };
  io.emit("notification", Notify);
  // Updates Live Notification
  res.send(Notify);
});

module.exports = notificationRouter;
