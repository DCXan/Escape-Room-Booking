const express = require("express");
const adminRouter = express.Router();
const Room = require("../schemas/room");
const Availability = require("../schemas/Availability");

// Retrieve Rooms List
adminRouter.get("/get-rooms", async (req, res) => {
  try {
    const rooms = await Room.find({});

    res.json({
      success: true,
      rooms: rooms,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
    console.log(error);
  }
});

// Retrieve Availabilities List
adminRouter.get("/get-availabilities/:roomID", async (req, res) => {
  const roomID = req.params.roomID;

  try {
    const availabilities = await Availability.find({ roomID: roomID });

    res.json({
      success: true,
      availabilities: availabilities,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
    console.log(error);
  }
});

// Update a room
adminRouter.post("/update-room/:roomID", async (req, res) => {
  const roomID = req.params.roomID;

  const {
    title,
    description,
    maxPlayers,
    durationMinutes,
    adultRate,
    childRate,
    privateRate,
    additionalDetails,
  } = req.body;

  console.log(req.body);

  try {
    Room.findByIdAndUpdate(
      roomID,
      {
        Subject: title,
        description: description,
        maxPlayers: maxPlayers,
        durationMinutes: durationMinutes,
        adultRate: adultRate,
        childRate: childRate,
        privateRate: privateRate,
        additionalDetails: additionalDetails,
      },
      (error, data) => {
        if (error) {
          console.log(error);
          res.json({
            success: false,
            message: "Unable to update room.",
          });
        } else {
          res.json({
            success: true,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Post route to pass room info from client to server
adminRouter.post("/add-room", async (req, res) => {
  const {
    title,
    description,
    maxPlayers,
    durationMinutes,
    adultRate,
    childRate,
    privateRate,
    additionalDetails,
  } = req.body;

  const room = new Room({
    Subject: title,
    description: description,
    maxPlayers: maxPlayers,
    durationMinutes: durationMinutes,
    adultRate: adultRate,
    childRate: childRate,
    privateRate: privateRate,
    additionalDetails: additionalDetails,
  });

  try {
    await room.save();

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
});

// Set room availability
adminRouter.post("/add-availability/:roomID", async (req, res) => {
  const roomID = req.params.roomID;

  const {
    sundayTimeslots,
    mondayTimeslots,
    tuesdayTimeslots,
    wednesdayTimeslots,
    thursdayTimeslots,
    fridayTimeslots,
    saturdayTimeslots,
  } = req.body;

  try {
    const availability = new Availability({
      roomID: roomID,
      timeslots: {
        sunday: sundayTimeslots,
        monday: mondayTimeslots,
        tuesday: tuesdayTimeslots,
        wednesday: wednesdayTimeslots,
        thursday: thursdayTimeslots,
        friday: fridayTimeslots,
        saturday: saturdayTimeslots,
      },
    });

    await availability.save();

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
});

// Find room by id

adminRouter.get("/get-room/:roomID", async (req, res) => {
  const roomID = req.params.roomID;
  try {
    const rooms = await Room.findById(roomID, {});

    res.json({
      success: true,
      rooms: rooms,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
    console.log(error);
  }
});
module.exports = adminRouter;
