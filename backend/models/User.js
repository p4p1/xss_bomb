var mongoose = require('mongoose')
var findOrCreate = require('mongoose-findorcreate')

var UserSchema = new mongoose.Schema({
  uid: String,
  username: String,
  password: String,
  notificationId: String,
})


UserSchema.plugin(findOrCreate)

module.exports = mongoose.model('Users', UserSchema)
