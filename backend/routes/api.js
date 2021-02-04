const express = require('express');
const router = express.Router()
const User = require('../models/User.js');
const { Expo } = require("expo-server-sdk");
const expo = new Expo();

function sendNotification (pushToken, notification) {
  try {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`)
      return false
    }
    var notificationToPush = [
      {
        to: pushToken,
        sound: 'default',
        title: notification.title,
        body: notification.body,
        data: notification
      }
    ]
    let chunks = expo.chunkPushNotifications(notificationToPush)
    ;(async () => {
      for (let chunk of chunks) {
        try {
          let receipts = await expo.sendPushNotificationsAsync(chunk)
          console.log(receipts)
        } catch (error) {
          console.error(error)
        }
      }
      return true
    })()
  } catch (e) {
    console.log(e)
  }
}

router.get('/:id', function (req, res) {
  console.log(req.params.id);
  User.find({
    api_id: req.params.id,
  }).exec((err, data) => {
    if (err || data.length != 1) {
      return res.status(500).send("ko");
    } else {
      sendNotification(data[0].notificationId, { title: "xss - hit",
        body: req.headers['user-agent'] })
      return res.status(200).send("ok");
    }
  });
  return res.status(200).send("ko");
})

module.exports = router
