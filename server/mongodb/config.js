let mongoose = require('mongoose')
let mongoUri = 'mongodb://rjmohammad:1234@ds157479.mlab.com:57479/ecma-monopoly'

let mongodb = mongoose.connect(mongoUri)

module.exports = mongodb
