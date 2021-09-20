var mongoose = require('mongoose')
var findOrCreate = require('mongoose-findorcreate')

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  notificationId: String,
  api_id: String,
  code: String,
  public: Boolean,
  posts: Array,
  total_hits: Number,
  code_injected: Number,
  image_shown: Number,
  payload_download: Number,
})


UserSchema.plugin(findOrCreate)

module.exports = mongoose.model('Users', UserSchema)
