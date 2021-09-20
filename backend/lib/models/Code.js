var mongoose = require('mongoose')
var findOrCreate = require('mongoose-findorcreate')

var CodeSchema = new mongoose.Schema({
  name: String,
  description: String,
  userId: String,
  code: String,
  downloads: Number
})


CodeSchema.plugin(findOrCreate)

module.exports = mongoose.model('Code', CodeSchema)
