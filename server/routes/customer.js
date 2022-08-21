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

//admin will receive ALL CUSTOMERS
customerRouter.get("/get-customers", async (req, res) => {
  try {
    // const customers = await Customer.find({});
    const customers = await Customer.find({}).populate("rooms");
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
