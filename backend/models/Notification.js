var mongoose = require('mongoose')
var findOrCreate = require('mongoose-findorcreate')

var NotificationSchema = new mongoose.Schema({
  api_id: String,
  method: String,
  date: Date,
  link: String,
  userAgent: String,
  ipAddress: String,
})


NotificationSchema.plugin(findOrCreate)

module.exports = mongoose.model('Notification', NotificationSchema)
