const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      // required: true,
    },
    last_name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      unique: false,
      // required: true,
    },
    phone: {
      type: String,
      // required: false,
    },
    dateAndTime: {
      type: String,
      // required: true,
    },
    numberOfPlayers: {
      type: Number,
      // required: true,
    },
    amountPaid: {
      type: Number,
      // required: true,
    },
    checkoutStatus: {
      type: String,
      // required: true,
    },
    rooms: {
      type: mongoose.Schema.ObjectId,
      ref: "Room",
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
