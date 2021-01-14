// Promise.all polyfill
function all(promises) {
  return new Promise(function(resolve,reject) {
    var count = promises.length
    var result = []
    var checkDone = function() { if (--count === 0) resolve(result) }
    promises.forEach(function(p, i) {
      p.then(function(x) { result[i] = x }, reject).then(checkDone)
    })
  })
}

// delay helper for creating promises that resolve after ms milliseconds
function delay(ms, value) {
  return new Promise(function(pass) {
    setTimeout(pass, ms, value)
  })
}

// resolved promises wait for one another but ensure order is kept
all([
  delay(100, 'a'),
  delay(200, 'b'),
  delay(50, 'c'),
  delay(1000, 'd')
])
.then(console.log, console.error) // [ a, b, c, d ]

// check that error rejects asap
all([
  delay(100, 'a'),
  delay(200, 'b'),
  Promise.reject(Error('bad things happened')),
  delay(50, 'c'),
  delay(1000, 'd')
])
.then(console.log, console.error) // Error: bad things happened