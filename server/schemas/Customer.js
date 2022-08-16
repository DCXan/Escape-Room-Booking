const mongoose = require("mongoose")
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
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    date: Number,
    subject: String,
    players: Number,
  },
  { timestamps: true }
)

//may need to link a room schema to this one so escape rooms know which rooms was booked

const Customer = mongoose.model("Customer", customerSchema)
module.exports = Customer
