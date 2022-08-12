const express = require("express");
const eventRouter = express.Router();
const Event = require("../schemas/Event");

eventRouter.post("/create-event", async (req, res) => {
  const event = Event(req.body);
  console.log(event);
  const _ = await event.save();
  res.sendStatus(201);
});

eventRouter.get("/get-events", async (req, res) => {
  //$gte = greater than equal -  $lte = less than equal
  const events = await Event.find({
    start: { $gte: req.query.start },
    end: { $lte: req.query.end },
  });
  res.send(events);
});

module.exports = eventRouter;
