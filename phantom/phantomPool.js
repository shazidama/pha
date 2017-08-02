const phantom = require('phantom'),
  _ = require('lodash'),
  createPhantomPool = require('phantom-pool'),
  cookies = require('./cookie/byrLinshao.json'),
  urls = require('./urls/byrUrls.json'),
  recurce = require('./recures')

class Pool {
  constructor(poolData){

    console.log(poolData)

    this.pool = createPhantomPool(poolData)
    this.instances = new Set()
  }

  release = async (instance)=>{
    this.instances.delete(instance)
    await this.pool.release(instance)
  }

  // arrAcquire = async (phantomArr)=>{
  //   if(!Array.isArray(phantomArr))
  //     phantomArr = [phantomArr]
  //   Promise.all(phantomArr.map(
  //     (pha)=>{
  //       this.instances.add(this.pool.acquire())
  //     })
  //   )
  //   return this.instances
  // } 

  // allRelease = async ()=>{
  //   for(let ins of this.instances){
  //     this.release(ins)
  //   }
  //   return this.available
  // }

  // poolCheck = async (phantomArr)=>{
  //   let inputNum = Array.isArray(phantomArr)? phantomArr.length:1
  //   let state = this.getState(this.pool)
  //   return state.available-inputNum>0
  // }

  // poolIncrease = async (incSymbol)=>{
  //   if(incSymbol)
  //     this.pool._config.max=this.pool._config.max*3/2
  // }

  // poolDecrease = (decSymbol)=>{
  //   if(decSymbol&&this.pool._config.max/3*2>this.pool.min)
  //     this.pool._config.max=this.pool._config.max*2/3
  // }

  // getState = ({ size, available, pending, max, min, spareResourceCapacity }) => {
  //   const state = { size, available, pending, max, min, spareResourceCapacity }
  //   return state
  // } 
  
  // use = function (fn) {
  //   let resource = void 0
  //   this.pool.acquire().then(function (r) {
  //     resource = r
  //     return resource
  //   }).then(fn,
  //     function (err) {
  //       this.pool.release(resource)
  //       throw err
  //     })
  //   this.instances.add(resource)
  //   return resource
  // } 
} 

class pool1 {
  constructor(){
    console.log('lgd no1')
  }
}
module.exports =  Pool