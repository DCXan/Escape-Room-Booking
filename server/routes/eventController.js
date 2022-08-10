const router = require("express").Router();
const eventRouter = express.Router();
const event = require("../schemas/event");
const moment = require("moment");

eventRouter.post("/create-event", async (req, res) => {
  const { event } = req.body;
  await event.save();
  res.sendStatus(201);
});

eventRouter.get("/get-events", async (req, res) => {
  //$gte = greater than equal -  $lte = less than equal
  const events = await event.find({
    start: { $gte: moment(req.query.start).toDate() },
    end: { $lte: moment(req.query.end).toDate() },
  });
  res.send(events);
});

module.exports = eventRouter;
