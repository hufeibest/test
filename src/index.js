import x from './hg.js'
import { resolve } from 'path';
let a = [
    {a:2,da:false},
    {a:'dasd',da:false},
];
let ww = 'hufei';
let item = ww[Symbol.iterator]();
// console.log(ww);
// console.log(item.next());
// console.log(item.next());
// console.log(item.next());

class xx extends x{
    constructor(name,age){
        super(name, age);
        this.age = age;
        console.log(this.name);
        console.log(this.age);
    }
    // *[Symbol.iterator](){
    //     let x = 12;
    //     yield x;
    //     // for (let i in this) {
    //         // console.log(i);
    //     //     yield i;
    //     // }
    // }
    static mm (){
        // console.log('sas');
    }
}
let tt = new xx('hufei', 12);
console.log(tt);
class yy extends x {
  constructor(name,man){
    super(name)
    this.man = man;
  }
  ma(){
    console.log('zhenglamei')
  }
}
let mm = new yy('lamei', 'woman');
console.log(mm);
class  rr extends  yy{
  constructor(name,age){
    super(name,'bigwomen')
    this.ag = age
    console.log(super.man)
  }
  getMan (){
    // super.ma()
    console.log(this);
    // console.log(this);
    return this.man
  }
  ma(){
    console.log('hufei')
  }
}
let RR = new rr('zheng', 'dadsasdasdasd')
console.log(RR);
console.log(RR.getMan())
var xy = 12;
function* qq(){
    // console.log('hadiha')
    yield xy;
    yield xy;
    yield xy;
}
// let ss = new qq();
// console.log(ss);
// console.log(ss.next());
// xy = 45;
// console.log(ss.next());
// xy =78;
// console.log(ss.next());


// xx.mm();
// let hh = new xx('hufe',15);
// console.log(hh);
// for (let w of hh) {
    // console.log(w);
// }
let obj = {
    0:4,
    1:45,
    // length: 2,
    [Symbol.iterator]: Array.prototype[Symbol.iterator],
}
// obj[Symbol.iterator] = Array[Symbol.iterator];
for (let i of obj) {
    // console.log(i);
}
let str = new String('hufei');
let arr = [...str];
// console.log(arr);
str[Symbol.iterator] = function() {
    return {
        next () {
            if(this.first){
                this.first = false;
                return { value: '45', done: false};
            } else {
                return {done: true}
            }
            
        },
        return (){
            return {done:false};
        },
        first: true,
    }
}
let arr2 =  [...str];
// console.log(arr2);
// let  num = ;
// num.say();
// console.log(num);
// console.log(456466);
// console.log(x);
// x.xx();

function* gg() {
    yield* 'dasddasd';
}
// console.log(gg().next());
// console.log(new XMLHttpRequest());

// function time (resolve,reject) {
//     let i =12;
//     setTimeout(()={
//         if (i > 0) {
//             resolve(true);
//         } else {
//             reject(false)
//         }
//     })
// }
function* pro() {
    // let xhr = new XMLHttpRequest()
    let x = new Promise(function(resolve, reject) {
        let i =12;
        setTimeout(function(){
            if (i > 0) {
                resolve(true);
            } else {
                reject(false)
            }
        })
    });
    // console.log(x);
    yield x
}
 let pr = pro();
 let n = pr.next();
//  console.log(n);
 n.value.then(()=>{
    //  console.log('daushd');
 })
// console.log(po.next());

function timeout(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  
  async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
  }
  
  console.log(Promise.resolve());

  asyncPrint('hello world', 3000);
  class RangeIterator {
    constructor(start, stop) {
      this.value = start;
      this.stop = stop;
    }
  
    [Symbol.iterator]() { return this; }
  
    next() {
      var value = this.value;
      if (value < this.stop) {
        this.value++;
        return {done: false, value: value};
      }
      return {done: true, value: undefined};
    }
  }
  
  function range(start, stop) {
    let obj = new RangeIterator(start, stop);
    console.log(obj)
    return obj    
}
  
  for (var value of range(0, 3)) {
    console.log(value); // 0, 1, 2
  }
 let setARR = [
   {d:'14'},
   {d:'14'}
 ]
let da = [...setARR];
// console.log(da);

// console.log(...new Set([1,2,1,2,1,5,4,8]))

arr = {
  0:0,
  1:1,
  length:100
}
// console.log(Array.from(arr,(i, j )=> {
//   return j
// }));

arr = new Map();
let obj1 = {};
let obj2 = obj1;
arr.set(obj2,4687979)
arr.set(obj1,'sdas');
arr.set(obj1,'46468')
// console.log(JSON.stringify(arr))
// console.log([...arr]);

let arrw = new Proxy({
  xixi:function(){
    return 'wwww'
  }
},{
  // xixi:function(){
  //   return '456879'
  // },
  get: function(item,value) {
    console.log(item)
    console.log(this)
    return item
  },
  construct: function() {
    return this
  },
  apply: function(){
    return 'dasda'
  }
})

console.log(arrw.das.xixi())
// let eqwe = Object.create(arr);
// console.log(eqwe.ds);

arr = function(){
  return "this is a target"
}
let handler = {
  apply: function(target, cex, args) {
    return "this is a proxy"
  }
}

// a = new Proxy(arr, handler);
// console.log(a())
function ee(){
    let a = 12;
    let b = 13;
    return a,b
}
console.log(ee());