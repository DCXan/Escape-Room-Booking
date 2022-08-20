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

//customer post request to book a room

customerRouter.post("/customer-booking/:roomID", async (req, res) => {
  const roomID = req.params.roomID;
  console.log(roomID);

  const {
    first_name,
    last_name,
    email,
    phone,
    dateAndTime,
    numberOfPlayers,
    amountPaid,
    checkoutStatus,
  } = req.body;

  console.log(req.body);

  try {
    const customer = new Customer({
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      dateAndTime: dateAndTime,
      numberOfPlayers: numberOfPlayers,
      amountPaid: amountPaid,
      checkoutStatus: checkoutStatus,
      roomID: roomID,
    });

    await customer.save();

    res.json({
      success: true,
      customer: customer,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
    console.log(error);
  }
});

//admin will receive ALL CUSTOMERS
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
