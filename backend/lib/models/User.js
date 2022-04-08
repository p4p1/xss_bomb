var mongoose = require('mongoose')
var findOrCreate = require('mongoose-findorcreate')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '/.env') })

const LOCKOUT_TIME = process.env.LOCKOUT_TIME;
const MAX_LOGIN_ATTEMPT = process.env.MAX_LOGIN_ATTEMPT;

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  notificationId: String,
  api_id: String,
  code: String,
  public: Boolean,
  posts: Array,
  total_hits: { type: Number, required: true, default: 0 },
  code_injected: { type: Number, required: true, default: 0 },
  image_shown: { type: Number, required: true, default: 0 },
  payload_download: { type: Number, required: true, default: 0 },
  failed_login_attempts: { type: Number, required: true, default: 0 },
  lockout_time: Number,
})


UserSchema.plugin(findOrCreate)

UserSchema.virtual('isLocked').get(function() {
      return !!(this.lockout_time && this.lockout_time > Date.now());
});

UserSchema.methods.failLoginIncrement = function (callback) {
  var lockExpired = !!(this.lockout_time && this.lockout_time < Date.now());

  if (lockExpired) {
    return this.updateOne({
        $set: { failed_login_attempts: 0 },
        $unset: { lockout_time: 1 }
    }, callback);
  }
  var updates = { $inc: { failed_login_attempts : 1 } };
  var needToLock = !!(this.failed_login_attempts >= MAX_LOGIN_ATTEMPT && !this.isLocked);
  if (needToLock) {
    updates.$set = { lockout_time: Date.now() + LOCKOUT_TIME };
  }
  return this.updateOne(updates, callback);
};

module.exports = mongoose.model('Users', UserSchema)
