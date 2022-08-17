const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  roomID: mongoose.SchemaTypes.ObjectId,
  availableDays: {
    Sunday: Boolean,
    Monday: Boolean,
    Tuesday: Boolean,
    Wednesday: Boolean,
    Thursday: Boolean,
    Friday: Boolean,
    Saturday: Boolean,
},
  timeslots: [Number],
  repeatWeekly: Boolean,
  },
  {timestamps: true}
)

const Availability = mongoose.model("Availability", availabilitySchema);


module.exports = Availability;