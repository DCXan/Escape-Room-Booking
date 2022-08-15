const express = require("express");
const adminRouter = express.Router();
const Room = require("../schemas/room");

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
    availability: {
      availableDays: [
        {
          Sunday: { isAvailable: sundayStatus, timeslots: timeslots },
        },
      ],
      repeatWeekly: repeatStatus,
    },
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
    availability: {
      availableDays: [
        {
          Sunday: {
            isAvailable: sundayStatus,
            timeslots: timeslots,
          },
        },
      ],
      repeatWeekly: repeatStatus,
    },
  });

  try {
    await room.save();
    // console.log(savedRoom)
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

module.exports = adminRouter;
