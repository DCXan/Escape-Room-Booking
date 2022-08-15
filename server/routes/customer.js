const express = require("express");
const customerRouter = express.Router();
const Customer = require("../schemas/customer");
const Room = require("../schemas/room");

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

module.exports = customerRouter;
