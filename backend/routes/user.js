const express = require('express');
const mongoose = require('mongoose')
const router = express.Router()
const logger = require('../lib/logger.js');
const bcrypt = require("bcryptjs");

const User = require('../lib/models/User.js');
const Notification = require('../lib/models/Notification.js');
const Code = require('../lib/models/Code.js');

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
      data[0].password = undefined;
      data[0].notificationId = undefined;
      data[0].__v = undefined;
      return res.status(200).send(data[0]);
    }
  })
})

router.get('/get_user/:index', middleware.isLoggedIn, function (req, res) {
  User.find({
    _id: mongoose.mongo.ObjectId(req.params.index),
  }).exec((err, data) => {
    if (err || data.length != 1 || data[0].public === undefined || data[0].public == false) {
      return res.status(500).send("User not found");
    } else {
      data[0].password = undefined;
      data[0].__v = undefined;
      data[0].code = undefined;
      data[0].api_id = undefined;
      data[0].notificationId = undefined;
      data[0].public = undefined;
      return res.status(200).send(data[0]);
    }
  })
})

router.get('/notifications/:page', middleware.isLoggedIn, function (req, res) {
  User.find({
    username: req.userData.username,
  }).exec((err, data) => {
    if (err || data.length != 1) {
      return res.status(500).send("User not found");
    } else {
      Notification.find({
        api_id: data[0].api_id
      }).sort({date:-1}).limit((req.params.page == 0) ? 10 : req.params.page * 10)
        .skip(req.params.page  * 10).exec((err, notifications) => {
        if (err) {
          return res.status(500).send("Api id not found");
        } else {
          var data = notifications;
          for (var i = 0; i < data.length; i++) {
            data[i].body = undefined;
            data[i].header = undefined;
          }
          return res.status(200).send(data);
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
        if (err && data[0].api_id == notifications[0].api_id) {
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

router.delete('/nuke', middleware.isLoggedIn, function (req, res) {
  try {
    User.find({
      username: req.userData.username,
    }).exec((err, data) => {
      if (err || data.length != 1) {
        return res.status(500).send({ msg: "Username or password incorrect!" });
      } else {
        bcrypt.compare(req.body.password, data[0].password, (bErr, bResult) => {
          if (bErr) {
            return res.status(401).send({msg: "Username or password incorrect!"});
          }
          if (bResult) {
            Notification.find({
              api_id: data[0].api_id
            }).exec((err, notifications) => {
              if (err) {
                return res.status(500).send("Api id not found");
              } else {
                for (var i = 0; i < notifications.length; i++) {
                  Notification.deleteOne({
                    _id: mongoose.mongo.ObjectId(notifications[i]._id)
                  }). then(() => {
                    console.log("Removed notification of:" + req.userData.username);
                  }).catch((err) => {
                    console.log(err);
                  })
                }
              }
            })
            Code.find({
              userId: data[0]._id
            }).exec((err, code) => {
              if (err) {
                return res.status(500).send("Code id not found");
              } else {
                for (var i = 0; i < code.length; i++) {
                  Code.deleteOne({
                    _id: mongoose.mongo.ObjectId(code[i]._id)
                  }). then(() => {
                    console.log("Removed code of:" + req.userData.username);
                  }).catch((err) => {
                    console.log(err);
                  })
                }
              }
            })
            User.deleteOne({
              _id: mongoose.mongo.ObjectId(data[0]._id)
            }). then(() => {
              console.log("Removed user of:" + req.userData.username);
              logger.error(`User ${req.userData.username} just nuked himself`);
            }).catch((err) => {
              console.log(err);
            })
            return res.status(200).send({ msg: "User deleted!" });
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

router.patch('/set_public', middleware.isLoggedIn, function (req, res) {
  User.find({
    username: req.userData.username,
  }).exec((err, data) => {
    if (err || data.length != 1) {
      return res.status(500).send("User not found");
    } else {
      User.findByIdAndUpdate(data[0]._id, {public: !data[0].public}, (err) => {
        if (err) {
          console.log(err);
          return res.status(401).send({ msg: "Incorrect username or password!" });
        }
        if (data[0].public == false) {
          return res.status(200).send({ msg: "Set to public!" });
        }
        return res.status(200).send({ msg: "Set to private!" });
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
