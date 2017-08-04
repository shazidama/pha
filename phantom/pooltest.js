let createPool = require('./phantomPool')

let pool = new createPool({
  maxUses: 3,
  min: 1,
  max: 2
})
console.log('sg')
pool.destroy()