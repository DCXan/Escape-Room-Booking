const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    Subject: String,
    description: String,
    maxPlayers: Number,
    adultRate: Number,
    childRate: Number,
    privateRate: Number,
    additionalDetails: String,
  },

  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
