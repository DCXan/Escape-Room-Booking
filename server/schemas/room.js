const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  days: [
    { Sunday: Boolean },
    { Monday: Boolean },
    { Tuesday: Boolean },
    { Wednesday: Boolean },
    { Thursday: Boolean },
    { Friday: Boolean },
    { Saturday: Boolean },
  ],
  startTimes: [Number],
});

const roomSchema = new mongoose.Schema({
  title: String,
  description: String,
  maxPlayers: Number,
  durationMinutes: Number,
  adultRate: Number,
  childRate: Number,
  privateRate: Number,
  additionalDetails: String,
  date: String,
  availability: availabilitySchema,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Availability = mongoose.model("Availability", availabilitySchema);
const Room = mongoose.model("Room", roomSchema);

module.exports = Availability;
module.exports = Room;
