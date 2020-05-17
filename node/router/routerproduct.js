const exp = require('express')
const router = exp.Router()
const fs = require('fs')
const path = require('path')
const pro = require('../db/model/product')
const cate = require('../db/model/category1')
const multer = require('multer')
var Mongoose = require('mongoose');
var ObjectId = Mongoose.Types.ObjectId;
module.exports = router
let upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './static/')
    },
    filename: function (req, file, cb) {

      let ext = file.originalname.split('.')[file.originalname.split('.').length - 1]
      let headname = file.originalname.split('.').slice(0, -1).join('.').toString()
      let random = new Date().getTime()
      let name = headname + '.' + random + '.' + ext
      cb(null, name)
    }
  })
})
router.post('/getproducts', (req, res) => {
  const { num, size } = req.body
  let total = 0
  pro.find((err, doc) => {
    total = doc.length
  })
  pro.find().limit(size).skip((num - 1) * size).then((doc) => {
    res.send({ doc, total })
  })
})

router.post('/search', (req, res) => {
  const { type, keywords, size, num } = req.body
  let query = {}
  let total = 0
  query[type] = new RegExp(keywords)
  pro.find(query).then((doc) => {
    total = doc.length
  })
  pro.find(query).limit(size).skip((num - 1) * size).then((doc) => {
    res.send({ doc, total })

  })

})

router.post('/getcatename', (req, res) => {
  const id = parseInt(req.body.id)
  cate.aggregate([{ $unwind: '$children' }, { $match: { 'children._id': id } }], (err, doc) => {

    res.send(doc)

  })
})


router.post('/productUpdate', (req, res) => {
  const { _id, status } = req.body
  const newstatus = status == 1 ? 2 : 1
  pro.updateOne({ _id }, { $set: { status: newstatus } }, (err, doc) => {
    res.send(doc)
  })
})
router.post('/getcategory', (req, res) => {
  const { _id } = req.body
  if (_id) {
    cate.find({ _id }, (err, doc) => {
      console.log(doc);

      res.send(doc)
    })
  }
  else
    cate.find((err, doc) => {
      res.send(doc)
    })
})

router.post('/upload', upload.single('img'), (req, res) => {

  let url = `/public/${req.file.filename}`
  // let url = `/public/${req.file.filename}`
  let { filename } = req.file

  res.send({ url, filename })

})

router.post('/deleimg', (req, res) => {
  let { filename } = req.body
  let url = path.join(__dirname, `../static/${filename}`)

  if (fs.existsSync(url)) {
    fs.unlink(url, (err) => {
      console.log(err);

      res.send('delete')
    })
  }
})

router.post('/updateoradd', (req, res) => {
  const { _id, pcateid, imgs, cateid, name, desc, detail, price } = req.body

  let catename = ''
  let pcatename = ''
  // if (_id) {
  if (cateid) {
    console.log(pcateid)
    console.log(cateid);
    ;

    cate.aggregate([{ $unwind: '$children' }, { $match: { _id: new ObjectId(pcateid), 'children._id': cateid } }], (err, doc) => {
      console.log(doc);

      catename = doc[0].children.name
      pcatename = doc[0].name

    })
  } else {
    cate.find({ _id: pcateid }, (err, doc) => {
      pcatename = doc[0].name
    })
  }
  if (_id) {
    pro.updateOne({ _id, }, { $set: { pcatename, catename, pcateid, cateid, name, desc, imgs, detail, price } }, (err, doc) => {
      console.log(doc);
      res.send(doc)

    })
  }
  // }
  else {
    pro.insertMany({ pcatename, catename, pcateid, cateid, name, desc, imgs, detail, price }, (err, doc) => {
      res.send(doc)
    })
  }




})
// { $match: { 'children._id': 4749 } },
// cate.aggregate([{ $unwind: '$children' }, { $match: { _id: new ObjectId("5e9358f35e9675459adf12e8"), 'children._id': 4749 } }], (err, doc) => {
//   console.log(doc);

//   // res.send(doc)

// })