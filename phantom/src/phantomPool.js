const phantom = require('phantom'),
  _ = require('lodash'),
  createPhantomPool = require('phantom-pool')

class pool {
  constructor(poolData){
    this.pool = createPhantomPool(poolData)
    this.instances = new Set()
  }

  async release (instance){
    await this.instances.delete(instance)
    await this.pool.release(instance)
  }

  async arrAcquire (phantomArr){
    if(!Array.isArray(phantomArr))
      phantomArr = [phantomArr]
    await Promise.all(phantomArr.map(
      (pha)=>{
        this.instances.add(this.pool.acquire())
      })
    )
    return this.instances
  } 

  async allRelease (){
    for(let ins of this.instances){
      this.release(ins)
    }
    return this.available
  }

  async poolCheck(phantomArr){
    let inputNum = Array.isArray(phantomArr)? phantomArr.length:1
    let state = this.getState(this.pool)
    return state.available-inputNum>0
  }

  async poolIncrease(incSymbol){
    if(incSymbol)
      this.pool._config.max=this.pool._config.max*3/2
  }

  async poolDecrease(decSymbol){
    if(decSymbol&&this.pool._config.max/3*2>this.pool.min)
      this.pool._config.max=this.pool._config.max*2/3
  }

  getState({ size, available, pending, max, min, spareResourceCapacity })  {
    const state = { size, available, pending, max, min, spareResourceCapacity }
    return state
  } 
  
  async use(fn){
    let resource = void 0
    await this.pool.acquire().then(function (r) {
      resource = r
      this.instances.add(resource)
      return resource
    }.bind(this)).then(fn.bind(this),
      function (err) {
        this.release(resource)
        throw err
      }.bind(this))
    await this.release(resource)
    return 'sg'
  } 
  async test(){
    console.log('sg')
  }
  async destroy(){
    let state = await this.getState(this.pool)
    await this.pool.drain()
    return this.pool.clear()
  }
} 

module.exports =  pool