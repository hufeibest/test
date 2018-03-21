import x from './hg.js'
let a = [
    {a:2,da:false},
    {a:'dasd',da:false},
];
let ww = 'hufei';
let item = ww[Symbol.iterator]();
// console.log(item.next());
// console.log(item.next());
// console.log(item.next());

class xx extends x{
    constructor(name,age){
        super(name);
        this.age = age;
        // console.log(this.name);
        // console.log(this.age);
    }
    *[Symbol.iterator](){
        let x = 12;
        yield x;
        // for (let i in this) {
            // console.log(i);
        //     yield i;
        // }
    }
    static mm (){
        // console.log('sas');
    }
}
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
let hh = new xx('hufe',15);
// console.log(hh);
for (let w of hh) {
    // console.log(w);
}
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
        next: function () {
            if(this.first){
                this.first = false;
                return { value: '45', done: false};
            } else {
                return {done: true}
            }
            
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
console.log(gg().next());