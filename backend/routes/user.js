const express = require('express');
const middleware = require("../middleware/middleware.js");
const User = require('../models/User.js');

const router = express.Router()

router.post('/login', middleware.validateRegister, function (req, res, next) {
  try {
    User.findOrCreate(
      { uid: 'test' },
      {
        uid: 'test',
        username: req.body.username,
        password: req.body.password,
      },
      function (err, user) {
        if (err) {
          console.err(err)
        }
      }
    )
    res.status(200).send({ msg: "Account created!" });
  } catch (e) {
    res.send(e)
  }
})

router.post('/register', middleware.validateRegister, function (req, res, next) {
  try {
    User.findOrCreate(
      { uid: 'test' },
      {
        uid: 'test',
        username: req.body.username,
        password: req.body.password,
      },
      function (err, user) {
        if (err) {
          console.err(err)
        }
      }
    )
    res.status(200).send({ msg: "Account created!" });
  } catch (e) {
    res.send(e)
  }
})

module.exports = router
