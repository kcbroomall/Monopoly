const msgHistory = require('../controllers/msgHistoryController')
const board = require('../models/board')
let newGame = {}
let game = {}
const location = [
  [97, 97], [97, 83], [97, 75], [97, 66.5], [97, 58.5], [97, 50], [97, 42], [97, 34], [97, 25.5], [97, 17.5], [97, 2.5],
  [84.5, 2.5], [76.4, 2.5], [68.2, 2.5], [60, 2.5], [51.8, 2.5], [43.5, 2.5], [35.4, 2.5], [27.1, 2.5], [19, 2.5], [7, 2.5],
  [7, 17.5], [7, 25.5], [7, 34], [7, 42], [7, 50], [7, 58.5], [7, 66.5], [7, 75], [7, 83],
  [7, 97], [19, 97], [27.1, 97], [35.4, 97], [43.5, 97], [51.8, 97], [60, 97], [68.2, 97], [76.4, 97], [84.5, 97]
]

module.exports = (io) => {
  let userStorage = {}
  io.on('connection', function (socket) {
    socket.on('user joined', (data) => {
      socket['nickname'] = data.id
      userStorage[data.id] = data
      io.sockets.emit('user joined', userStorage)
      socket.emit('get games', newGame)
      board.lookupGame(data.id)
        .then((results) => {
          if (results[0].length > 0) {
            socket.emit('pending games', results[0])
          }
        })
    })
    socket.on('new game', (data) => {
      data.socketID = socket.id
      data.userPosition = [91, 91]
      var state = { players: 1, i: 0, playerInfo: { 0: data } }
      board.addGame(state, data)
        .then((result) => {
          const gameID = result[0]
          socket.roomOwner = gameID
          board.addPlayer(gameID, data.userID)
          game[gameID] = state
          newGame[gameID] = gameID
          socket.broadcast.emit('new game', { newGame, socketID: socket.id })
          io.to(socket.id).emit('your index', {index: game[gameID].players - 1, newGame})
          socket.join(result.toString())
        })
    })

    socket.on('join', (data) => {
      let gameObj = game[data.gameID]
      if (gameObj.players < 8) {
        var index = gameObj.players++
        data.socketID = socket.id
        board.addPlayer(data.gameID, data.userID)
        data.userPosition = [91, 91]
        socket.join(data.gameID)
        var obj = {}
        obj[index] = data
        gameObj.playerInfo[index] = data
        io.to(socket.id).emit('your index', {index})
        socket.broadcast.to(gameObj.playerInfo[0].socketID).emit('player joined', data)
      } else {
        io.sockets.in(data.gameID).emit('player started')
      }
    })

    socket.on('start', (data) => {
      delete newGame[data.gameID]
      io.emit('update games', newGame)
      io.sockets.in(data.gameID).emit('player started')
    })

    socket.on('load', (data) => {
      let gameObj = game[data.gameID]
      let refresh = false
      if (gameObj.playerInfo[data.index].socketID !== socket.id) {
        refresh = true
        gameObj.playerInfo[data.index].socketID = socket.id
      }
      if (!refresh) {
        io.emit('users', { players: gameObj['playerInfo'] })
        socket.broadcast.to(gameObj.playerInfo[0].socketID).emit('yourTurn', { index: gameObj.i, numOfPlayers: gameObj.players })
      } else {
        if (Number(data.index) === gameObj.i) {
          socket.join(data.gameID)
          socket.emit('yourTurn', { index: gameObj.i, numOfPlayers: gameObj.players })
        }
      }
      // TODO Randomize users
    })

    socket.on('endTurn', (data) => {
      let gameObj = game[data.gameID]
      gameObj.i++
      if (gameObj.i >= gameObj.players) {
        gameObj.i = 0
      }
      gameObj['playerInfo'][data.index].userPosition = location[data.pos]
      socket.broadcast.to(gameObj.playerInfo[gameObj.i].socketID).emit('yourTurn', { index: gameObj.i, numOfPlayers: gameObj.players })
    })

    socket.on('dice rolled', (data) => {
      let gameObj = game[data.gameID]
      gameObj['playerInfo'][data.index].userPosition = location[data.pos]
      board.updateInfo(JSON.stringify(gameObj), data.gameID)
        .then(() => {
          socket.broadcast.to(data.gameID).emit('update position', { pos: data.pos, index: data.index })
        })
    })

    socket.on('new-message', (msgInfo) => {
      let sender = msgInfo.sender
      let message = msgInfo.message
      let room = msgInfo.room
      let picture = msgInfo.picture
      msgHistory.addMessage(sender, message, room, picture)
      .then(({sender, message, room, _id, picture}) => {
        io.emit('receive-message', {sender, message, room, _id, picture})
      })
    })

    socket.on('update database', (data) => {
      board.updateState(data)
        .then(() => {
          // None
        })
    })
    socket.on('property update', (data) => {
      socket.broadcast.to(data.gameID).emit('update properties', { properties: data.properties, index: data.index })
    })

    socket.on('money update', (data) => {
      socket.broadcast.to(data.gameID).emit('update money', { money: data.money, index: data.index })
    })

    socket.on('jail free update', (data) => {
      socket.broadcast.to(data.gameID).emit('update jail free', { jailFreeArray: data.jailFreeArray, index: data.index })
    })

    socket.on('load game', (data) => {
      board.getGame(data.gameID)
        .then((results) => {
          let state = JSON.parse(results[0][0].gstate)
          let info = JSON.parse(results[0][0].info)
          for (let key in info['playerInfo']) {
            if (info['playerInfo'][key].userID === data.userID) {
              state.playerIndex = key
              break
            }
          }
          if (!game[data.gameID]) {
            game[data.gameID] = info
          }
          socket.join(data.gameID)
          socket.emit('load state', state)
        })
    })

    socket.on('comment', (data) => {
      io.sockets.in(data.gameID).emit('receive-comment', data.comment)
    })

    socket.on('trade offer', (data) => {
      socket.broadcast.to(data.playerSocket).emit('offer for you', { position: data.position, socket: socket.id, offer: data.offer, offerIndex: data.offerIndex })
    })

    socket.on('disconnect', () => {
      const id = socket.nickname
      const gameID = socket.roomOwner
      delete newGame[gameID]
      delete userStorage[id]
      io.sockets.emit('user joined', userStorage)
      socket.broadcast.emit('new game', { newGame, socketID: socket.id })
    })
  })
}
