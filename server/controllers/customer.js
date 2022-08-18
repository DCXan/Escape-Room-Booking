const e = require("express");
const mongoose = require("mongoose");

const Customer = require("../schemas/Customer");
const Room = require("../schemas/room");

const createCustomerBooking = async (req, res, next) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    dateAndTime,
    numberOfPlayers,
    room,
  } = req.body;

  const createdCustomerBooking = new Customer({
    first_name,
    last_name,
    email,
    phone,
    dateAndTime,
    numberOfPlayers,
    rooms: [],
  });

  let rooms;

  try {
    rooms = await Room.findById(room);
  } catch (error) {
    console.log(error);
    return next(error);
  }

  if (!rooms) {
    console.log(error);
    return next(error);
  }

  console.log(rooms);

  try {
    await createdCustomerBooking.save();
  } catch (error) {
    console.log(error);
  }
};
// first_name: req.body.first_name,
// last_name: req.body.last_name,
// email: req.body.email,
// phone: req.body.phone,
// dateAndTime: req.body.dateAndTime,
// numberOfPlayers: req.body.numberOfPlayers,
