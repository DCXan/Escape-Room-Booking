const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    dateAndTime: {
      type: String,
      required: true,
    },
    numberOfPlayers: {
      type: Number,
      required: true,
    },
    room: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
  },
  { timestamps: true }
);

//may need to link a room schema to this one so escape rooms know which rooms was booked

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
