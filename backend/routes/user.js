const express = require('express');
const mongoose = require('mongoose')
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
          return res.status(200).send(notifications.reverse());
        }
      })
    }
  })
})

router.get('/get_notification/:index', middleware.isLoggedIn, function (req, res) {
  User.find({
    username: req.userData.username,
  }).exec((err, data) => {
    if (err || data.length != 1) {
      return res.status(500).send("User not found");
    } else {
      Notification.find({
        _id: mongoose.mongo.ObjectId(req.params.index)
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

router.delete('/notification', middleware.isLoggedIn, function (req, res) {
  Notification.deleteOne({
    _id: mongoose.mongo.ObjectId(req.body.id)
  }). then(() => {
    return res.status(200).send({ msg: "Removed Notification" });
  }).catch((err) => {
    console.log(err);
    return res.status(400).send({ msg: "Incorrect Id!" });
  })
})

router.post('/change_username', middleware.isLoggedIn, function (req, res) {
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

router.post('/set_code', middleware.isLoggedIn, function (req, res) {
  User.find({
    username: req.userData.username,
  }).exec((err, data) => {
    if (err || data.length != 1) {
      return res.status(500).send("User not found");
    } else {
      User.findByIdAndUpdate(data[0]._id, {code: req.body.code}, (err) => {
        if (err) {
          console.log(err);
          return res.status(401).send({ msg: "Incorrect username or password!" });
        }
        return res.status(200).send({ msg: "Updated code!" });
      });
    }
  })
})

router.get('/get_code', middleware.isLoggedIn, function (req, res) {
  User.find({
    username: req.userData.username,
  }).exec((err, data) => {
    if (err || data.length != 1) {
      return res.status(500).send("User not found");
    } else {
      return res.status(200).send({ code: data[0].code });
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
