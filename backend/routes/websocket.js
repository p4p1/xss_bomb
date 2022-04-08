const express = require('express');
const router = express.Router()

const Websocket = require('../lib/models/Websocket.js');
const User = require('../lib/models/User.js');

const middleware = require("../middleware/middleware.js");

router.get('/:page', middleware.isLoggedIn, function (req, res) {
  User.find({
    username: req.userData.username,
  }).exec((err, data) => {
    if (err || data.length != 1) {
      return res.status(500).send("User not found");
    } else {
      Websocket.find({
        api_id: data[0].api_id
      }).sort({date:-1}).limit((req.params.page == 0) ? 10 : req.params.page * 10)
        .skip(req.params.page  * 10).exec((err, data) => {
        if (err) {
          return res.status(500).send("Api id not found");
        } else {
          return res.status(200).send(data);
        }
      })
    }
  })
})

module.exports = router
