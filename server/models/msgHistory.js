const mongoose = require('mongoose')

const msgHistory = new mongoose.Schema({
  sender: String,
  message: String,
  room: String,
  picture: String,
  created: {type: Date, default: Date.now}
})

module.exports = mongoose.model('msgHistory', msgHistory)
