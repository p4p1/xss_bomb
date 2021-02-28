var mongoose = require('mongoose')
var findOrCreate = require('mongoose-findorcreate')

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  notificationId: String,
  api_id: String,
  code: String,
})


UserSchema.plugin(findOrCreate)

module.exports = mongoose.model('Users', UserSchema)
