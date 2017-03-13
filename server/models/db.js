const config = require('../../env/db')
const knex = require('knex')(config)

module.exports = knex
