const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  roomID: mongoose.SchemaTypes.ObjectId,
  availableDays: [
    {Sunday: Boolean},
    {Monday: Boolean},
    {Tuesday: Boolean},
    {Wednesday: Boolean},
    {Thursday: Boolean},
    {Friday: Boolean},
    {Saturday: Boolean},
  ],
  timeslots: [Number],
  repeatWeekly: Boolean,
  },
  {timestamps: true}
);

const roomSchema = new mongoose.Schema({
  Subject: String,
  description: String,
  maxPlayers: Number,
  durationMinutes: Number,
  adultRate: Number,
  childRate: Number,
  privateRate: Number,
  additionalDetails: String,
  },
  {timestamps: true}

);

const Availability = mongoose.model("Availability", availabilitySchema);
const Room = mongoose.model("Room", roomSchema);

module.exports = Availability;
module.exports = Room;
