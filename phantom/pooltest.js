let createPool = require('./phantomPool')

let pool = new createPool({
  maxUses: 3,
  min: 1,
  max: 2
})