const express = require('express');
const middleware = require("../middleware/middleware.js");
const User = require('../lib/models/User.js');
const redis = require('../lib/redis.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const shortid = require("shortid");

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '/.env') })

const router = express.Router()
const SECRETKEY = process.env.SECRETKEY;
const REFRESH_SECRETKEY = process.env.REFRESH_SECRETKEY;

router.post('/register', middleware.validateRegister, function (req, res, next) {
  try {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({msg: err});
      } else {
        User.create(
          {
            username: req.body.username,
            password: hash,
            api_id: shortid.generate(),
            code: "alert(document.domain);", // Replace this for default code on new user
            public: false,
            posts: [],
            favorites: []
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
        return res.status(500).send({ msg: "Username or password incorrect!" });
      } else {
        if (data[0].isLocked) {
            return res.status(401).send({msg: "You are locked out for 24Hours"});
        }
        bcrypt.compare(req.body.password, data[0].password, (bErr, bResult) => {
          if (bErr) {
            return res.status(401).send({msg: "Username or password incorrect!"});
          }
          if (bResult) {
            const token = jwt.sign({ username: req.body.username }, SECRETKEY,
              { expiresIn: "7d" });
            redis.set(data[0]["_id"].toString(), token);
            User.findByIdAndUpdate(data[0]._id, {notificationId:
                                  req.body.notificationId}, (err) => {
              if (err) {
                console.log(err);
                return res.status(401).send({ msg: "Incorrect password!" });
              }
              return res.status(200).send({ msg: "Logged in!", token: token });
            });
          } else {
            data[0].failLoginIncrement(function(err) {
                if (err) {
                    console.log(err);
                }
            });
            return res.status(401).send({ msg: "Incorrect password!" });
          }
         });
      }
    })
  } catch (e) {
    return res.send(e)
  }
})

router.get('/refresh', middleware.refreshToken, function (req, res, next) {
  try {
    User.find({
      username: req.userData.username,
    }).exec((err, data) => {
      if (err || data.length != 1) {
        return res.status(500).send({ msg: "Username or password incorrect!" });
      } else {
        redis.get(data[0]["_id"].toString(), function(err, val) {
          if (err || val == null) {
            console.log(err);
            return res.status(401).send({ msg: "Incorrect token!" });
          } else {
            if (val == req.userToken) {
              const token = jwt.sign({ username: req.userData.username }, REFRESH_SECRETKEY,
                { expiresIn: "24h" });
              return res.status(200).send({ msg: "Logged in!", token: token });
            } else {
              return res.status(401).send({ msg: "Incorrect token!" });
            }
          }
        });
      }
    })
  } catch (e) {
    return res.send(e)
  }
})

module.exports = router
