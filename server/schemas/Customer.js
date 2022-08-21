<<<<<<< HEAD
const mongoose = require("mongoose")
=======
const mongoose = require("mongoose");

>>>>>>> 2478bc7343540aa8a21706056f972e8d759c8243
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
<<<<<<< HEAD
    date: Number,
    subject: String,
    players: Number,
=======
    dateAndTime: {
      type: String,
      required: true,
    },
    numberOfPlayers: {
      type: Number,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    checkoutStatus: {
      type: String,
      required: true,
    },
    rooms: {
      type: mongoose.Schema.ObjectId,
      ref: "Room",
    },
>>>>>>> 2478bc7343540aa8a21706056f972e8d759c8243
  },
  { timestamps: true }
)

//may need to link a room schema to this one so escape rooms know which rooms was booked

const Customer = mongoose.model("Customer", customerSchema)
module.exports = Customer
