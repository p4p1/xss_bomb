var mongoose = require('mongoose')
var findOrCreate = require('mongoose-findorcreate')

var WebsocketSchema = new mongoose.Schema({
  api_id: String,
  content: String,
  date: Date,
  ipAddress: String
})


WebsocketSchema.plugin(findOrCreate)

module.exports = mongoose.model('WebSocket', WebsocketSchema)
