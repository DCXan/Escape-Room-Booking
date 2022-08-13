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
    availableDays: [
      { Sunday: sundayStatus },
      { Monday: mondayStatus },
      { Tuesday: tuesdayStatus },
      { Wednesday: wednesdayStatus },
      { Thursday: thursdayStatus },
      { Friday: fridayStatus },
      { Saturday: saturdayStatus },
    ],
    startTimes: startTimes,
    repeatWeekly: repeatStatus,
  } = req.body;

  // console.log(req.body)

  const room = new Room({
    title: title,
    description: description,
    maxPlayers: maxPlayers,
    durationMinutes: durationMinutes,
    adultRate: adultRate,
    childRate: childRate,
    privateRate: privateRate,
    additionalDetails: additionalDetails,
    availability: {
      availableDays: [
        { Sunday: sundayStatus },
        { Monday: mondayStatus },
        { Tuesday: tuesdayStatus },
        { Wednesday: wednesdayStatus },
        { Thursday: thursdayStatus },
        { Friday: fridayStatus },
        { Saturday: saturdayStatus },
      ],
      startTimes: startTimes,
      reapeatWeekly: repeatStatus
    }
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
