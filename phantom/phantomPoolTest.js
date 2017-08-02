var test = require('blue-tape')
var createPool = require('phantom-pool')

let phantomPool
test('create pool with maxUses', async () => {
  phantomPool = createPool({
    maxUses: 3,
    min: 1,
    max: 2,
  })
})

test('instance is removed after 3 acquires', async (t) => {
  const acquire1 = await phantomPool.acquire()
  await phantomPool.release(acquire1)
  const acquire2 = await phantomPool.acquire()
  t.equal(acquire1, acquire2)
  await phantomPool.release(acquire2)
  const acquire3 = await phantomPool.acquire()
  t.equal(acquire1, acquire3)
  await phantomPool.release(acquire3)
  const acquire4 = await phantomPool.acquire()
  t.notEqual(acquire1, acquire4)
  await phantomPool.release(acquire4)
  const acquire5 = await phantomPool.acquire()
  const acquire6 = await phantomPool.acquire()
  console.log(phantomPool.pending,phantomPool.size, phantomPool.available, phantomPool.pending, phantomPool.max, phantomPool.min)
})

test('destroy pool', async () => {
  await phantomPool.drain()
  return phantomPool.clear()
})