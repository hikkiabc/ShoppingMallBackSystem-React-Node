const exp = require('express')
const router = exp.Router()
const role = require('../db/model/role')
const user = require('../db/model/user')
module.exports = router


router.post('/getroles', (req, res) => {

  // const { role_name, auth_time, authorizer, create_time } = req.body
  const { size, num } = req.body
  let total
  role.find((err, doc) => {
    total = doc.length
  })
  role.find().limit(size).skip(size * (num - 1)).then(doc => {
    res.send({ doc, total })
  })
})


router.post('/addrole', (req, res) => {

  role.insertMany({ role_name: req.body.rolename, create_time: new Date().getTime() }, (err, doc) => {
    res.send(doc)
  })
})

router.post('/setrole', (req, res) => {
  role.updateOne({ _id: req.body._id }, { $set: { authorizer: req.body.username, auth_time: new Date().getTime(), menu: req.body.menu } }, (err, doc) => {
    res.send(doc)
  })
})








// role.insertMany({ memu: [], role_name: 'role3', auth_time: new Date().getTime(), authorizer: 'admin1', create_time: new Date().getTime() }, (err, doc) => {
//   // res.send(doc)
// })

// user.find((err, doc) => {
//   role.find((err, roledoc) => {
//     doc.forEach(i => {

//       user.updateOne({ _id: i._id }, { $set: { role_id: roledoc[Math.floor((Math.random() * roledoc.length))]._id } }, (err, newdoc) => {

//       })
//     })
//   })
// })
