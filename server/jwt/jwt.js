var jwt = require('jsonwebtoken')

module.exports = {
  tokenGenerator: (user) => {
    const payload = {
      id: user
    }
    return jwt.sign(payload, 'ecmascriptElephant')
  },

  verifyToken: (token) => {
    return jwt.verify(token, 'ecmascriptElephant')
  }
}
