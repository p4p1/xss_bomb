const express = require('express');
const mongoose = require('mongoose')
const router = express.Router()

const User = require('../lib/models/User.js');
const Code = require('../lib/models/Code.js');
const middleware = require("../middleware/middleware.js");

router.post('/share', middleware.isLoggedIn, function (req, res) {
  User.find({
    username: req.userData.username,
  }).exec((err, data) => {
    if (req.body.name == undefined || (req.body.name.length < 1 && req.body.name.length > 50)) {
      return res.status(400).send("name length must be between 1 and 50");
    }
    if (req.body.description == undefined || (req.body.name.description < 1 && req.body.name.description > 300)) {
      return res.status(400).send("description length must be between 1 and 300");
    }
    if (err || data.length != 1) {
      return res.status(500).send("User not found");
    } else {
      Code.create(
        {
          name: req.body.name,
          description: req.body.description,
          userId: data[0]._id,
          isPublic: data[0].public,
          code: data[0].code,
          downloads: 0
        },
        function (err, code) {
          if (data[0].posts) {
            data[0].posts.push(code._id.toString());
          } else {
            data[0].posts = [code._id.toString()]
          }
          User.findByIdAndUpdate(data[0]._id, {posts: data[0].posts}, (err) => {
            if (err) {
              console.log(err);
            }
          });
          if (err) {
            console.err(err)
          }
        }
      )
      return res.status(200).send({ msg: "Thank you for sharing your code!" });
    }
  })
})

router.get('/:page', middleware.isLoggedIn, function (req, res) {
  Code.find({}).limit((req.params.page == 0) ? 10 : req.params.page * 10)
  .skip(req.params.page  * 10).exec((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Nothing found");
    } else {
      var cleared_data = data;

      for (var i = 0; i < cleared_data.length; i++) {
        if (cleared_data[i].isPublic === false) {
          cleared_data[i].userId = undefined;
        }
        cleared_data[i].isPublic = undefined;
      }
      return res.status(200).send(data);
    }
  });
})

router.get('/get_code/:id', middleware.isLoggedIn, function (req, res) {
  Code.find({
    _id: mongoose.mongo.ObjectId(req.params.id),
  }).exec((err, data) => {
    if (err || data.length != 1) {
      return res.status(500).send("Code not found");
    } else {
      var cleared_data = data[0];

      if (cleared_data.isPublic === false) {
        cleared_data.userId = undefined;
      }
      cleared_data.isPublic = undefined;
      return res.status(200).send(cleared_data);
    }
  });
})

router.get('/dl/:id', middleware.isLoggedIn, function (req, res) {
  Code.find({
    _id: mongoose.mongo.ObjectId(req.params.id),
  }).exec((err, data) => {
    if (err || data.length != 1) {
      return res.status(500).send("Code not found");
    } else {
      User.find({
        username: req.userData.username,
      }).exec((err, data3) => {
        if (err || data3.length != 1) {
          return res.status(500).send("User not found");
        } else {
          User.findByIdAndUpdate(data3[0]._id, {code: data[0].code}, (err) => {
            if (err) {
              console.log(err);
              return res.status(401).send({ msg: "User code not found!" });
            }
            // else { /* BELOW CODE SHOULD BE HERE BUT UGLY */ }
          });
        }
      })
      Code.findByIdAndUpdate(data[0]._id, {downloads: data[0].downloads + 1}, (err) => {
        if (err) {
          console.log(err);
          return res.status(401).send({ msg: "Wrong code id?" });
        }
        // else { /* SAME HERE THIS CODE IS KINDA UGLY */ }
      });

      /*
       * TODO: THIS CODE SHOULD BE PUT UP THERE IN AN ELSE
       */
      if (data[0].userId !== undefined) { // if the user is in private mode do not increment download number !
        User.find({
          _id: mongoose.mongo.ObjectId(data[0].userId),
        }).exec((err, data2) => {
          if (err || data2.length != 1) {
            return res.status(500).send("User not found");
          } else {
            User.findByIdAndUpdate(data2[0]._id, {payload_download: (data[0].payload_download) ? data[0].payload_download + 1 : 1}, (err) => {
              if (err) {
                console.log(err);
              }
              return res.status(200).send(data[0]);
            });
          }
        });
      } else { // otherwise increment it
        return res.status(200).send(data[0]);
      }
    }
  });
})

module.exports = router
