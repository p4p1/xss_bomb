const express = require('express');
const { Expo } = require("expo-server-sdk");
const bodyParser = require('body-parser');
const cors = require('cors');

let savedPushTokens = [];
const expo = new Expo();
const app = express();

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '/.env') })

var port = process.env.port || 8080;
var username = process.env.username || 'xss';
var password = process.env.password || 'bomb';

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

const handlePushTokens = ({ title, body }) => {
  let notifications = [];
  for (let pushToken of savedPushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    notifications.push({
      to: pushToken,
      sound: "default",
      title: title,
      body: body,
      data: { body }
    });
  }

  let chunks = expo.chunkPushNotifications(notifications);
  (async () => {
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
      } catch (error) {
        console.error(error);
      }
    }
  })();
};

const saveToken = token => {
  const exists = savedPushTokens.find(t => t === token);

  console.log(token, savedPushTokens);
  if (!exists) {
    savedPushTokens.push(token);
  }
};

app.listen(port, function() {
  console.log("Server running on port:" + port);
});

app.post("/token", (req, res) => {
  if (req.body.token == undefined || req.body.username == undefined ||
      req.body.password == undefined) {
    console.log("here");
    res.send({ data: "ko" });
    return
  }
  saveToken(req.body.token.value);
  console.log(`Received push token, ${req.body.token.value}`);
  res.send({ data: "ok" });
});

app.post("/message", (req, res) => {
  handlePushTokens(req.body);
  console.log(`Received message, with title: ${req.body.title}`);
  res.send(`Received message, with title: ${req.body.title}`);
});

app.get("/stager", (req, res) => {
  handlePushTokens("xss - stager", "uploading");
  res.sendFile('public/stager.js');
});

app.get("/isup", function (request, response) {
  console.log(process.env.username);
  console.log(process.env.password);
  response.json({ "data": "Hello World"});
});
