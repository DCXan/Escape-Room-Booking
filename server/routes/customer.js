const express = require("express")
const customerRouter = express.Router()
const { Room } = require("../schemas/room")

customerRouter.get("/get-rooms", async (req, res) => {
  try {
    const rooms = await Room.find({})
    console.log(rooms)

    res.json({
      success: true,
      rooms: rooms,
    })
  } catch (error) {
    res.json({
      success: false,
      message: error,
    })
    console.log(error)
  }
})

module.exports = customerRouter
