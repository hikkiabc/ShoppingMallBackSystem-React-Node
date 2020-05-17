const mg = require('mongoose')
mg.set('useCreateIndex', true)
mg.connect('mongodb://localhost/daimajiji', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('db starts');

}).catch(() => {
  console.log('db fails');

})