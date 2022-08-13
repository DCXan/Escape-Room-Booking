const mongoose = require("mongoose");

const timeSlots = [
    {1: '9:00am'},
    {2: '11:30am'},
    {3: '1:00pm'},
    {4: '2:30pm'},
    {5: '2:30pm'},
    {6: '2:30pm'},
    {7: '2:30pm'},
    {8: '2:30pm'},
    {9: '2:30pm'},
    {10: '2:30pm'},
    {11: '2:30pm'},
    {12: '2:30pm'},
]

const roomAvailabilitySchema = new mongoose.Schema({
  roomName: String,
  availableDays: [
      {Sunday: Boolean},
      {Monday: Boolean},
      {Tuesday: Boolean},
      {Wednesday: Boolean},
      {Thursday: Boolean},
      {Friday: Boolean},
      {Saturday: Boolean},
    ],
  timeSlots: [1, 2, 3, 4, 5]
});


const Availability = mongoose.model("RoomAvailability", roomAvailabilitySchema);


module.exports = Availability;
