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
    const availabilities = await Availability.find({
      roomID: roomID,
    });

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

  const availability = new Availability({
    roomID: room._id,
    timeslots: {
      sunday: [],
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: []
    }
  })

  try {
    await room.save();
    await availability.save()

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

adminRouter.post("/add-availability/:availabilityID", async (req, res) => {
  const availabilityID = req.params.availabilityID;

  const {
    timeslots: {
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday
    }
  } = req.body;


  console.log(req.body)

  try {
    
      const availability = await Availability.findByIdAndUpdate(
        availabilityID,
        {
          timeslots: {
            sunday: sunday,
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday
          }
        }

      )
      
    

    // await availability.save(req.body);


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

adminRouter.delete("/delete-room/:roomID", async (req, res) => {
  const roomID = req.params.roomID

  try {
    Room.findByIdAndDelete(
      roomID,
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

    // Availability.findOneAndDelete({
    //   roomID: roomID
    // })

  } catch (error) {
  console.log(error);
  }
})

module.exports = adminRouter;
