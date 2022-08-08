const express = require("express")
const adminRouter = express.Router()
const Room = require('../schemas/room');

// Post route to pass room info from client to server
adminRouter.post('/add-room', async (req, res) => {
    const {title, description, maxPlayers, durationMinutes, adultRate, childRate, privateRate, additionalDetails} = req.body
  
    console.log(req.body)
  
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
    
    let savedRoom = await room.save()
    console.log(savedRoom)
  
    res.send('OK')
  })

module.exports = adminRouter