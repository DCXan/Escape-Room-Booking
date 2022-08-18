const express = require("express");
const { default: mongoose } = require("mongoose");
const customerRouter = express.Router();
const Customer = require("../schemas/Customer");
const Room = require("../schemas/room");

//Route will display all rooms in database
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

//Route will find one room based on roomID
customerRouter.get("/get-booked-room/:roomID", async (req, res) => {
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

//admin will receive customer information

customerRouter.get("/get-customers", async (req, res) => {
  try {
    const customers = await Customer.find({});

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

customerRouter.post("/confirmed-booking/:roomID", async (req, res) => {
  const roomID = req.params.roomID;
  console.log(roomID);

  const { first_name, last_name, email, phone, dateAndTime, numberOfPlayers } =
    req.body;

  const customer = new Customer({
    roomID: roomID,
    first_name: first_name,
    last_name: last_name,
    email: email,
    phone: phone,
    dateAndTime: dateAndTime,
    numberOfPlayers: numberOfPlayers,
  });
  try {
    await customer.save();
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

module.exports = customerRouter;
