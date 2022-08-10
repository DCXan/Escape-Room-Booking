const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  start: Date,
  end: Date,
  title: String,
});

const event = mongoose.model("event", eventSchema);

module.exports = event;
