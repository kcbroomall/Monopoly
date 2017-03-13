const express = require('express')
const session = require('express-session')
const bcrypt = require('bcrypt-nodejs')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const routes = require('./routes/routes.js')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const config = require('../config/fb')
const LocalStrategy = require('passport-local').Strategy
const flash = require('connect-flash')
const User = require('./models/user')
const db = require('./models/db')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const ioRouter = require('./routes/io.js')
const token = require('./jwt/jwt')
// const mongodb = require('./mongodb/config')
const axios = require('axios')
app.use(cors())

const port = process.env.PORT || 8000

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((obj, done) => done(null, obj))
passport.use(new FacebookStrategy({
  clientID: config.clientID,
  clientSecret: config.clientSecret,
  callbackURL: config.callbackURL
},
  (accessToken, refreshToken, profile, done) => {
    passport.photo = `https://graph.facebook.com/v2.8/${profile.id}/picture`
    process.nextTick(() => {
      db.raw(`SELECT  * FROM fb_user where fbID = ${Number(profile.id)}`)
        .then((result) => {
          if (result[0].length === 0) {
            db.raw(`INSERT INTO fb_user VALUES (null, ${Number(profile.id)}, '${profile.displayName}')`)
              .then(() => {
                return done(null, profile)
              })
          } else {
            return done(null, profile)
          }
        })
    })
  }
))

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
  (req, username, password, done) => {
    process.nextTick(() => {
      User.findByUsername(username, (result) => {
        if (result[0].length === 0) {
          bcrypt.genSalt(2, (err, salt) => {
            if (err) {
              console.log('Salt error ', err)
            }
            bcrypt.hash(password, salt, null, (err, hash) => {
              if (err) {
                console.log(err)
                return
              }
              User.addUser(username, hash, req.body.displayName)
                .then((data) => {
                  passport.user = {id: data, displayname: req.body.displayName}
                  passport.token = token.tokenGenerator(data)
                  return done(null, username)
                })
            })
          })
        } else {
          // console.log('user existed')
          // return done(null, false, req.flash('signupMessage', 'User exited.'));
        }
      })
    })
  }
))

passport.use('local-login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
},
  (req, username, password, done) => {
    User.findByUsername(username, (result) => {
      if (result[0].length === 0) {
        return done(null, false, req.flash('loginMessage', 'User not found.'))
      } else {
        result = JSON.parse(JSON.stringify(result[0]))
        bcrypt.compare(password, result[0].password, (err, resp) => {
          if (err) console.error(err)
          if (resp) {
            passport.user = {id: result[0].id, displayname: result[0].displayname}
            passport.token = token.tokenGenerator(result[0].id)
            return done(null, result[0])
          } else {
            // return done(null, false, req.flash('loginMessage', 'Incorrect password.'))
          }
        })
      }
    })
  }
))

app.use(passport.initialize())
app.use(passport.session())

app.use(session({
  secret: 'ecmascriptElephant',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '../index')))
app.use(express.static(path.join(__dirname, '../src')))

routes(app, express, passport)
ioRouter(io)
// app.listen(port)
server.listen(port)

module.exports = app
