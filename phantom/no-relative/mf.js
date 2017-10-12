// let obj = {
//     center:{
//       title:'图形位置',
//       type:'array',
//       description:'需要两个输入,输入为百分比,如20%',
//       items:{
//         type:'string'
//       }
//     }
// }

// let json = JSON.stringify(obj, null, 2)
//     console.log(json)

let a = {a:'a',b:{c:'c',d:'d'}}
let {b={e:'sg'}} = a
// console.log(b)
class g {
  c(){console.log(this.num)}
  constructor(num){
    this.num = num
  }
  test(fn){
    fn(this)
  }
}

let ag = new g(2)
ag.c()
ag.test((obj)=>{
  console.log(obj)}
)
/* 
class ggg {
  abc = ()=>{}
} */
//abc = ()=>{} works with babel 