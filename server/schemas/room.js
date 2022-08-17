const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  availableDays: [
    {
      Sunday: {
        isAvailable: Boolean,
        timeslots: [Number],
      },
    },
  ],
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
  // createdAt: {
  //   type: Date,
  //   immutable: true,
  //   default: () => Date.now(),
  // },
  // updatedAt: {
  //   type: Date,
  //   default: () => Date.now(),
  // },
  },
  {timestamps: true}

);

const Availability = mongoose.model("Availability", availabilitySchema);
const Room = mongoose.model("Room", roomSchema);

module.exports = Availability;
module.exports = Room;
