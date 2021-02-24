function CustomPromise(executor) {
  const PENDING = 1;
  const FULFILLED = 2;
  const REJECTED = 3;

  let state = PENDING;
  let value = null;
  let handlers = [];
  let catches = [];

  function resolve(result) {
    if (state !== PENDING) return;
    value = result;
    state = FULFILLED;
    handlers.forEach((h) => h(value));
    return this;
  }

  function reject(err) {
    if (state !== PENDING) return;
    value = err;
    state = REJECTED;
    catches.forEach((h) => h(value));
  }

  this.then = function (callback) {
    if (state === FULFILLED) {
      callback(value);
    } else {
      handlers.push(callback);
    }
    return this;
  };

  executor(resolve, reject);
}

var func = (resolve, reject) => {
  setTimeout(() => {
    resolve("Hey I am resolved");
  }, 3000);
};
// var myPromise = new CustomPromise(func);
// myPromise.then( (res) => new Promise(func))
// .then((res)=> console.log(res));

var basicPromise = new CustomPromise(func);
basicPromise
  .then((res) => {
    console.log(res);
    return new CustomPromise(func);
  })
  .then((res) => {
    console.log(res);
  });
