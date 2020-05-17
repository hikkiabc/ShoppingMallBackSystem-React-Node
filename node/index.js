const exp = require('express')
const app = exp()
const routeruser = require('./router/routeruser')
const routercate = require('./router/routercate')
const routerpro = require('./router/routerproduct')
const routerrole = require('./router/routerrole')
const path = require('path')
require('./db/connect')
const bodyparser = require('body-parser')
app.listen(2000, () => {
  console.log("2000 starts");
})
app.use('/public', exp.static(path.join(__dirname, ('./static'))))
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
// app.use('/', (req, res, next) => {
//   res.header("access-control-allow-origin", "*")
//   res.header("access-control-allow-headers", 'autherization,content-type')
//   next()
// })
app.use('/user', routeruser)
app.use('/cate', routercate)
app.use('/product', routerpro)
app.use('/role', routerrole)


