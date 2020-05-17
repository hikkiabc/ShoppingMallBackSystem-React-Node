const mg = require('mongoose')


module.exports = mg.model('product', new mg.Schema({
  name: { type: String }, desc: { type: String }, cateid: { type: String }, pcateid: { type: String }, detail: { type: String }
  , price: { type: Number }, imgs: { type: Array },
  status: { type: Number }, catename: { type: String }, pcatename: { type: String }
}))