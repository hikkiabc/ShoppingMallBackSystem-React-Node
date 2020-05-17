const mg = require('mongoose')
module.exports = mg.model('cate1', new mg.Schema({
  parentid: { type: Number }, name: { type: String }, children: { type: Array }
}))