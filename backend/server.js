const express = require('express');
const { Expo } = require("expo-server-sdk");
const bodyParser = require('body-parser');
const cors = require('cors');

const expo = new Expo();
const app = express();

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '/.env') })

let savedPushTokens = [];
let notification_array = [];
let source_code = '';

var port = process.env.port || 8080;
var username = process.env.username || 'xss';
var password = process.env.password || 'bomb';

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

function get_date() {
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  
  return (year + "-" + month + "-" + date + "-" + hours + ":" + minutes);
}

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
  if (req.body.token == undefined || req.body.username != username ||
      req.body.password != password) {
    res.send({ data: "ko" });
    return
  }
  saveToken(req.body.token.value);
  console.log(`Received push token, ${req.body.token.value}`);
  res.send({ data: "ok" });
});

app.post("/notifications", (req, res) => {
  if (req.body.username != username || req.body.password != password) {
    res.send({ data: "ko" });
    return
  }
  res.send(notification_array);
});

app.post("/message", (req, res) => {
  handlePushTokens(req.body);
  notification_array.push({
    'route': '/message',
    'content': req.body,
    'date': get_date(),
    'user-agent': req.headers['user-agent']
  });
  console.log(`Received message, with title: ${req.body.title}`);
  res.send(`Received message, with title: ${req.body.title}`);
});

app.post("/setstager", (req, res) => {
  if (req.body.username != username || req.body.password != password) {
    res.send({ data: "ko" });
    return
  }
  source_code = req.body.source;
  res.send({ data: "ok" });
});

app.get("/stager", (req, res) => {
  console.log();
  if (req.headers['user-agent'] != "xss_bomb_app") {
    notification_array.push({
      'route': '/stager',
      'content': undefined,
      'date': get_date(),
      'user-agent': req.headers['user-agent']
    });
    handlePushTokens({title: "xss - stager", body: req.headers['user-agent']});
  }
  res.send(source_code);
});

app.get("/pic", (req, res) => {
  notification_array.push({
    'route': '/pic',
    'content': undefined,
    'date': get_date(),
    'user-agent': req.headers['user-agent']
  });
  handlePushTokens({title: "xss - picture", body: req.headers['user-agent']});
  res.sendFile(__dirname + "/public/1px.png");
});

app.get("/isup", function (request, response) {
  console.log(process.env.username);
  console.log(process.env.password);
  response.json({ "data": "Hello World"});
});
