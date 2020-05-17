const mongoose = require('mongoose')
module.exports = mongoose.model('role', new mongoose.Schema({
  menu: { type: Array }, role_name: { type: String }, create_time: { type: String }, auth_time: { type: String }, authorizer: { type: String }
}))