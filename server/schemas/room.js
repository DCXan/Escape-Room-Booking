const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    Subject: String,
    description: String,
    maxPlayers: Number,
    durationMinutes: Number,
    adultRate: Number,
    childRate: Number,
    privateRate: Number,
    additionalDetails: String,
    customer: { type: mongoose.Types.ObjectId, ref: "Customer" },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
