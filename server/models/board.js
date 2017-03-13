const db = require('./db')

const BoardGame = {
  addGame: (state, info) => {
    state = JSON.stringify(state)
    info = JSON.stringify(info)
    return db('game').insert({ 'gstate': state, 'info': info })
    .catch((err) => {
      console.log(err)
    })
  },

  addPlayer: (gameID, playerID) => {
    return db.raw(`INSERT INTO players VALUES (null, ${playerID}, ${gameID})`)
    .catch((err) => {
      console.log(err)
    })
  },

  updateState: (state) => {
    const obj = JSON.stringify(state.state)
    return db('game')
    .where('id', '=', state.gameID)
    .update({'gstate': obj})
  },

  updateInfo: (info, id) => {
    return db('game')
    .where('id', '=', id)
    .update({'info': info})
  },

  lookupGame: (userID) => {
    return db.raw(`Select gameID from players where playerID=${userID}`)
    .catch((err) => {
      console.log(err)
    })
  },

  getGame: (gameID) => {
    return db.raw(`Select gstate, info from game where id=${gameID}`)
    .catch((err) => {
      console.log(err)
    })
  }
}

module.exports = BoardGame
