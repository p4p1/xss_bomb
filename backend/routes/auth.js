const express = require('express');
const middleware = require("../middleware/middleware.js");
const User = require('../models/User.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const shortid = require("shortid");

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '/.env') })

const router = express.Router()
const SECRETKEY = process.env.SECRETKEY;

router.post('/register', middleware.validateRegister, function (req, res, next) {
  try {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({msg: err});
      } else {
        console.log(hash);
        User.create(
          {
            username: req.body.username,
            password: hash,
            api_id: shortid.generate(),
            code: "alert(1);"
          },
          function (err, user) {
            if (err) {
              console.err(err)
            }
          }
        )
        return res.status(200).send({ msg: "Account created!" });
      }
    });
  } catch (e) {
    return res.send(e)
  }
})

router.post('/login', middleware.checkLogin, function (req, res, next) {
  try {
    User.find({
      username: req.body.username,
    }).exec((err, data) => {
      if (err || data.length != 1) {
        return res.status(500).send({ msg: "User does not exist" });
      } else {
        bcrypt.compare(req.body.password, data[0].password, (bErr, bResult) => {
          if (bErr) {
            return res.status(401).send({msg: "Username or password incorrect!"});
          }
          if (bResult) {
            const token = jwt.sign({ username: req.body.username }, SECRETKEY,
              { expiresIn: "7d" });
            User.findByIdAndUpdate(data[0]._id, {notificationId:
                                  req.body.notificationId}, (err) => {
              if (err) {
                console.log(err);
                return res.status(401).send({ msg: "Incorrect password!" });
              }
              return res.status(200).send({ msg: "Logged in!", token: token });
            });
          } else {
            return res.status(401).send({ msg: "Incorrect password!" });
          }
         });
      }
    })
  } catch (e) {
    return res.send(e)
  }
})

module.exports = router
