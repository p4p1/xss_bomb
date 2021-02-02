const jwt = require("jsonwebtoken");
const User = require('../models/User.js');

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '/.env') })

const SECRETKEY = process.env.SECRETKEY;

module.exports = {
  isLoggedIn: (req, res, next) => {
    try {
      // extract the authorization after Bearer
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, SECRETKEY);

      req.userData = decoded;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).send({ msg: "Your session is not valid!" });
    }
  },
  validateRegister: (req, res, next) => {
    User.find({
      username: req.body.username,
    }).exec((err, data) => {
      console.log(data);
      console.log(err);
      if (err || data.length == 0) {
        if (!req.body.username || req.body.username.length < 3) {
          return res.status(400).send({
            msg: "Please enter a username with min. 3 chars"
          });
        }
        if (!req.body.password || req.body.password.length < 6) {
          return res.status(400).send({
            msg: "Please enter a password with min. 6 chars"
          });
        }
      } else {
          return res.status(400).send({
            msg: "User already exists"
          });
      }
      next();
    })
  },
  checkLogin: (req, res, next) => {
    if (!req.body.username || req.body.username.length < 3) {
      return res.status(400).send({
        msg: "Please enter a username with min. 3 chars"
      });
    }
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        msg: "Please enter a password with min. 6 chars"
      });
    }
    if (!req.body.notificationId) {
      return res.status(400).send({
        msg: "You need to login using a phone :/"
      });
    }
    next();
  }
}
