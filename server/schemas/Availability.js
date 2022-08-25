const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  roomID: mongoose.SchemaTypes.ObjectId,
  timeslots: {
    sunday: [Number],
    monday: [Number],
    tuesday: [Number],
    wednesday: [Number],
    thursday: [Number],
    friday: [Number],
    saturday: [Number],
  },
  date: { type: String },
  customer: { type: mongoose.Schema.ObjectId, ref: "Customer" },
});

const Availability = mongoose.model("Availability", availabilitySchema);

module.exports = Availability;
