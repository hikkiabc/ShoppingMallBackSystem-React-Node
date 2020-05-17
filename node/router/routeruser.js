const user = require('../db/model/user')
const role = require('../db/model/role')
const exp = require('express')
const router = exp.Router()
module.exports = router
router.post('/login', (req, res) => {
  const { username, password } = req.body
  user.find({ username, password }, (err, doc) => {
    if (err) res.send(err)
    else if (doc.length > 0) {
      role.find({ _id: doc[0].role_id }, (err, roledoc) => {
        res.send({ code: 1, msg: 'login sucessfully', user: doc[0], role: roledoc[0] })

      })
      // res.send({ code: 1, msg: 'login sucessfully' ,user:doc,role:})
    }
    else res.send('wrong password')
  })
})

router.post('/getusers', (req, res) => {
  const { size, num } = req.body
  let total
  user.find((err, doc) => {
    total = doc.length
    user.find().limit(size).skip(size * (num - 1)).then(userdoc => {
      role.find((err, roledoc) => {
        res.send({ total, userdoc, roledoc })
      })
    })

  })

})

router.post('/deleteUser', (req, res) => {
  user.deleteOne({ _id: req.body._id }, (err, doc) => {
    res.send(doc)
  })
})
router.post('/adduser', (req, res) => {
  user.insertMany({ username: req.body.username, password: req.body.password, role_id: req.body.roleid }, (err, doc) => {
    res.send(doc)
  })
})

router.post('/updateuser', (req, res) => {
  user.updateOne({ _id: req.body._id }, { $set: { username: req.body.username, role_id: req.body.roleid } }, (err, doc) => {
    res.send(doc)
  })
})

user.find({ _id: '5ebef5287d5b093a551856a4' }, (err, doc) => {
  role.find({ _id: doc[0].role_id }, { menu: 1 }, (er, doc) => {
    console.log(doc);

  })

})