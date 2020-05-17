const exp = require('express')
const router = exp.Router()
const cate1 = require('../db/model/category1')
const pro = require('../db/model/product')
module.exports = router

router.post('/getcate1', (req, res) => {

  let total = 0
  const { num, size, pid } = req.body
  if (pid) {

    if (num != 1) {
      cate1.find({ _id: pid }, { children: 1 }).then((doc) => {
        res.send(doc[0].children)
        // res.send(doc[0].children.slice((num - 1) * size, (num - 1) * size + num))
      })
    } else {


      cate1.find({ _id: pid }, { children: 1 }, (err, doc) => {

        res.send(doc)
      })
    }
  }
  else {

    let all = []
    cate1.find((err, doc) => {
      total = doc.length
      all = doc
    })

    cate1.find({}, { children: 0 }).limit(size).skip((num - 1) * size).then((doc) => {
      res.send({ doc, total, all })

    })

  }
})

router.use('/edit', (req, res) => {
  const { _id, oldname, name } = req.body

  if (oldname) {

    cate1.updateOne({ _id }, { $set: { 'children.$[i].name': name } }, {
      arrayFilters: [{
        'i.name': oldname
      }]
    }, (err, doc) => {

      res.send(doc);
    })
  }
  else {
    cate1.updateOne({ _id }, { $set: { name } }, (err, doc) => {
      res.send(doc)
    })
  }
})

router.use('/add', (req, res) => {
  const { pid, name } = req.body

  console.log(name, pid);

  if (pid == 0)
    cate1.insertMany({ name }, (err, doc) => {
      console.log(1);

      res.send(doc)
    })
  else
    cate1.updateMany({ _id: pid }, { $push: { 'children': { name } } }, (err, doc) => {
      res.send(doc)
    })
})

// cate1.find((err, doc) => {
//   let product = []
//   doc.forEach(i => {
//     let item = {}
//     let citem = {}
//     citem = i.children.map(ci => {

//       item.pcateid = i._id, item.cateid = ci._id, item.name = "电视", item.desc = "this is description", item.detail = "<p>detail</p>", item.price = 1500, item.status = 1

//       return item
//     })
//     product = product.concat(citem)
//   })

//   pro.insertMany(product)
// })

