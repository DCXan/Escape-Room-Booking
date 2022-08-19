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
  }
})

const Availability = mongoose.model("Availability", availabilitySchema);


module.exports = Availability;