const redis = require("redis");

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '/.env') })

var redisClient = redis.createClient({
  host: 'redis',
  port: 6379,
  password: process.env.REDISPASS,
});

redisClient.on("connect", function () {
  console.log("redis plugged in!");
});


module.exports = redisClient;
