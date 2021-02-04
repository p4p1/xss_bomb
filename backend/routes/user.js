const express = require('express');
const router = express.Router()

const middleware = require("../middleware/middleware.js");

router.get('/check', middleware.isLoggedIn, function (req, res, next) {
  return res.status(200).send({ msg: "Your session is valid!" });
})

module.exports = router
