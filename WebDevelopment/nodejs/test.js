const example1 = (a, b) => {
    return a + b
}

console.log('Start-1')
const c = example1(12, 2)
console.log(c)
console.log('End-1')

///
function addCps (a, b, callback) {
    callback(a + b)
  }

console.log('before-2')
addCps(1, 2, result => console.log(`Result: ${result}`))
console.log('after-2')

////

const multiplyasync = (a, b, callback) => {
    let log = []
    
    //callback(a * b)
    //process.nextTick(() => callback(a * b))
    for (let i =0; i < 1000990000; i += 1) {
        //log.push(i)
        //console.log(i)
    }
    process.nextTick(() => callback(a * b))
    //callback(a * b)
}

console.log('Start-3')
const d = multiplyasync(12, 2, (d) => {
    console.log("End of callback", d)
})
console.log('End-3')