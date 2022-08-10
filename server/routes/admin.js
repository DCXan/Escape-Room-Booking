const express = require("express")
const adminRouter = express.Router()
const Room = require('../schemas/room');

// Post route to pass room info from client to server
adminRouter.post('/add-room', async (req, res) => {
    const {title, description, maxPlayers, durationMinutes, adultRate, childRate, privateRate, additionalDetails} = req.body
  
    // console.log(req.body)
  
    const room = new Room({
      title: title,
      description: description,
      maxPlayers: maxPlayers,
      durationMinutes: durationMinutes,
      adultRate: adultRate,
      childRate: childRate,
      privateRate: privateRate,
      additionalDetails: additionalDetails
    })
    
    try { 
      await room.save()
      // console.log(savedRoom)
      res.json({
        success: true
      })
    } catch(error) {
      res.json({
        success: false, message: error
      })
    }
  })

module.exports = adminRouter