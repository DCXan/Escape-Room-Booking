const express = require("express");
const customerRouter = express.Router();
const Customer = require("../schemas/Customer");
const Room = require("../schemas/room");

// Route will display all rooms in database
customerRouter.get("/get-rooms", async (req, res) => {
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

//Create a new customer
customerRouter.post("/customer-booking/:id", async (req, res) => {
  const newCustomer = await Customer.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      customer: newCustomer,
    },
  });
});

//Sends all customer orders with room attached

customerRouter.get("/get-customers", async (req, res) => {
  try {
    const customers = await Customer.find({}).populate({
      path: "rooms",
      select:
        "-EndTime -RecurrenceRule -StartTime -additionalDetails -adultRate -childRate -createdAt -date -description -durationMinutes -maxPlayers -privateRate -updatedAt -__v -_id",
    });
    res.json({
      success: true,
      customers: customers,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
    console.log(error);
  }
});

//sends only selected data
customerRouter.get("/get-limited-customer-details", async (req, res) => {
  try {
    const customers = await Customer.find(
      {},
      {
        createdAt: 0,
        updatedAt: 0,
        isActive: 0,
        _id: 0,
        __v: 0,
        email: 0,
        phone: 0,
      }
    ).populate({
      path: "rooms",
      select:
        "-EndTime -RecurrenceRule -StartTime -additionalDetails -adultRate -childRate -createdAt -date -description -durationMinutes -image -maxPlayers -privateRate -updatedAt -__v -_id",
    });
    res.json({
      success: true,
      customers: customers,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
    console.log(error);
  }
});

module.exports = customerRouter;
