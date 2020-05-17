const mg = require('mongoose')
const sc = new mg.Schema({
  username: { type: String, unique: true }, password: { type: String }, role_id: { type: String }
})

module.exports = mg.model('user', sc)