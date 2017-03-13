const msgHistory = require('../models/msgHistory')
const Q = require('q')

const queryMSG = Q.nbind(msgHistory.find, msgHistory)
const add = Q.nbind(msgHistory.create, msgHistory)
module.exports = {

  addMessage: (sender, message, room, picture) => {
    return add({
      sender: sender,
      message: message,
      room: room,
      picture: picture
    })
  },
  getMessage: () => {
    return queryMSG({ $query: {}, $orderby: { $natural: -1 } })
  },
  allHistory: (keyword, res) => {
    msgHistory.find({ message: { $regex: keyword } }, (err, chats) => {
      if (err) res.status(500).send(err)
      else res.send(chats)
    })
  },

  historyByQuery: (room, keyword, res) => {
    msgHistory.find({ room: room, message: { $regex: keyword } }, (err, chats) => {
      if (err) res.status(500).send(err)
      else res.send(chats)
    })
  }

}
