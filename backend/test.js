const express = require("express");
const { Expo } = require("expo-server-sdk");
const app = express();
const expo = new Expo();
const cors = require("cors");

app.use(cors());
let savedPushTokens = [];
const PORT_NUMBER = 3000;

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
    console.log(token, savedPushTokens);
    const exists = savedPushTokens.find(t => t === token);
    if (!exists) {
          savedPushTokens.push(token);
        }
};

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Push Notification Server Running");
});

app.post("/token", (req, res) => {
    saveToken(req.body.token.value);
    console.log(`Received push token, ${req.body.token.value}`);
    res.send(`Received push token, ${req.body.token.value}`);
});

app.post("/message", (req, res) => {
    handlePushTokens(req.body);
    console.log(`Received message, with title: ${req.body.title}`);
    res.send(`Received message, with title: ${req.body.title}`);
});

app.listen(PORT_NUMBER, () => {
    console.log(`Server Online on Port ${PORT_NUMBER}`);
});
