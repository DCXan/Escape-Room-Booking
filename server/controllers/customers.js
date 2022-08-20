const mongoose = require("mongoose");
const Room = require("../schemas/room");

// const Customer = require("../schemas/Customer");
exports.customer_customerBooking = async (req, res, next) => {
  const { name } = req.body;
  console.log(req.body);
  try {
    const customer = await customer({
      name: name,
    });
    await customer.save();
    res.status(201).json({
      success: true,
      message: "New customer booking created",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to create customer",
    });
  }
};
