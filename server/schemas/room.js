const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    title: String,
    description: String,
    maxPlayers: Number,
    durationMinutes: Number,
    adultRate: Number,
    childRate: Number,
    privateRate: Number,
    additionalDetails: String
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room