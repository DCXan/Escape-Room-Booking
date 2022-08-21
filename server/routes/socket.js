const express = require("express");
const notificationRouter = express.Router();

notificationRouter.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

module.exports = notificationRouter;
