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
        "-EndTime -RecurrenceRule -StartTime -additionalDetails -adultRate -childRate -createdAt -date -description -durationMinutes -maxPlayers -privateRate -updatedAt -__v",
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

//Sends limited responses with newest results first

customerRouter.get("/get-limited-customers", async (req, res) => {
  try {
    const customers = await Customer.find({})
      .populate({
        path: "rooms",
        select:
          "-EndTime -RecurrenceRule -StartTime -additionalDetails -adultRate -childRate -createdAt -date -description -durationMinutes -maxPlayers -privateRate -updatedAt -__v -_id",
      })
      .sort({ createdAt: -1 })
      .limit(3);
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
        __v: 0,
        email: 0,
        phone: 0,
      }
    ).populate({
      path: "rooms",
      select:
        "-EndTime -RecurrenceRule -StartTime -additionalDetails -adultRate -childRate -createdAt -date -description -durationMinutes -image -maxPlayers -privateRate -updatedAt -__v",
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

customerRouter.patch("/edit-customer", async (req, res) => {
  try {
    let customer = { ...req.body };
    const customerID = customer._id;

    console.log(customer);
    console.log(customerID);

    const customerDetails = await Customer.findByIdAndUpdate(
      customerID,
      req.body,
      { upsert: true, new: true }
    ).populate({
      path: "rooms",
      select:
        "-EndTime -RecurrenceRule -StartTime -additionalDetails -adultRate -childRate -createdAt -date -description -durationMinutes -maxPlayers -privateRate -updatedAt -__v",
    });

    res.status(200).json({
      success: true,
      customerDetails: customerDetails,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

customerRouter.delete("/delete-customer/:customerID", async (req, res) => {
  const customerID = req.params.customerID;

  console.log(req.body);

  try {
    const customerDetails = await Customer.findByIdAndDelete(
      customerID,
      req.body
    );

    // await availability.save(req.body);

    res.json({
      success: true,
      customerDetails: customerDetails,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
});

module.exports = customerRouter;
