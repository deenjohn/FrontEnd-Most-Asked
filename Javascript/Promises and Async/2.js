function asyncFunc() {
  var c = new Promise((resolve, reject) => {
    console.log(1); // not async
    setTimeout(() => resolve("DONE"), 100); // (B) //async
  });

  console.log(2);
}

asyncFunc();
