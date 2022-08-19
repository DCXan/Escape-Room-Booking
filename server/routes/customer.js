const express = require("express");
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

customerRouter.post("/update-booking/:customerID", async (req, res) => {
  const { customerID, roomID } = req.params.customerID;
  console.log(req.params);
  const { first_name, last_name, email, phone, dateAndTime } = req.body;

  console.log(req.body);

  try {
    Room.findByIdAndUpdate(customerID, {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      dateAndTime: dateAndTime,
      roomID: roomID,
    });
    res.json({
      success: true,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "room not found" });
  }
});
// Room.findByIdAndUpdate(
//   customerID,
//   {
//     first_name: first_name,
//     last_name: last_name,
//     email: email,
//     phone: phone,
//     dateAndTime: dateAndTime,
//   },
//   (error, data) => {
//     if (error) {
//       console.log(error);
//       res.json({
//         success: false,
//         message: "Unable to update customer.",
//       });
//     } else {
//       res.json({
//         success: true,
//       });
//     }
//   }
// );

//Route will find one customer based on their id
customerRouter.get("/get-booked-room/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const rooms = await Customer.findById(id, {});
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
