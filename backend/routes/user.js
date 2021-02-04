const express = require('express');
const router = express.Router()
const bcrypt = require("bcryptjs");

const User = require('../models/User.js');
const Notification = require('../models/Notification.js');
const middleware = require("../middleware/middleware.js");

router.get('/check', middleware.isLoggedIn, function (req, res) {
  return res.status(200).send({ msg: "Your session is valid!" });
})

router.get('/get_api', middleware.isLoggedIn, function (req, res) {
  User.find({
    username: req.userData.username,
  }).exec((err, data) => {
    if (err || data.length != 1) {
      return res.status(500).send("User not found");
    } else {
      return res.status(200).send({ token: data[0].api_id });
    }
  })
})

router.get('/get_user', middleware.isLoggedIn, function (req, res) {
  User.find({
    username: req.userData.username,
  }).exec((err, data) => {
    if (err || data.length != 1) {
      return res.status(500).send("User not found");
    } else {
      return res.status(200).send(data[0]);
    }
  })
})

router.get('/get_notifications', middleware.isLoggedIn, function (req, res) {
  User.find({
    username: req.userData.username,
  }).exec((err, data) => {
    if (err || data.length != 1) {
      return res.status(500).send("User not found");
    } else {
      Notification.find({
        api_id: data[0].api_id
      }).exec((err, notifications) => {
        if (err) {
          return res.status(500).send("Api id not found");
        } else {
          return res.status(200).send(notifications);
        }
      })
    }
  })
})

router.post('/change_username', middleware.isLoggedIn, function (req, res) {
  console.log(req.body);
  console.log(req.body.username);
  User.find({
    username: req.userData.username,
  }).exec((err, data) => {
    if (err || data.length != 1) {
      return res.status(500).send("User not found");
    } else {
      User.findByIdAndUpdate(data[0]._id, {username: req.body.username}, (err) => {
        if (err) {
          console.log(err);
          return res.status(401).send({ msg: "Incorrect username!" });
        }
        return res.status(200).send({ msg: "Updated username!" });
      });
    }
  })
})

router.post('/change_password', middleware.isLoggedIn, function (req, res) {
  User.find({
    username: req.userData.username,
  }).exec((err, data) => {
    if (err || data.length != 1) {
      return res.status(500).send("User not found");
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).send({msg: err});
        } else {
          User.findByIdAndUpdate(data[0]._id, {password: hash}, (err) => {
            if (err) {
              console.log(err);
              return res.status(401).send({ msg: "Incorrect password!" });
            }
            return res.status(200).send({ msg: "Updated password!" });
          });
        }
      })
    }
  })
})

module.exports = router
