function* x() {
    yield 12;
}
let xx = x();
console.log(xx.next());