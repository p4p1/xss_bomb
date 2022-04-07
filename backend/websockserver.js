var ws = require('ws');

const User = require('./lib/models/User.js');
const Websocket = require('./lib/models/Websocket.js');

var wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', (socket, req) => {
    socket.on('message', message => {
      console.log(req.url.replace('/', ''))
      User.find({
        api_id: req.url.replace('/', '')
      }).exec((err, data) => {
        if (err || data.length != 1) {
          socket.close(); // TODO: This does not close the connection for some reason???
        } else {
          Websocket.create({
            api_id: req.url.replace('/', ''),
            content: message,
            date: new Date(),
            ipAddress: req.socket.remoteAddress
          }, function(err) {
            if (err) {
              console.error(err)
            }
          })
        }
      })
    });
});

module.exports = wsServer;
