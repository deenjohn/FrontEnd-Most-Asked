function httpGet(x) {
  return new Promise((res, rej) => {
    setTimeout(() => res(`done ${x}`), 1000);
  });
}

function delay(ms) {
  return Promise.resolve().then(() => {
    setTimeout(() => Promise.resolve("done"), ms); //after ms sec resolve
  });
}

Promise.race([
  httpGet("http://example.com/file.txt"),
  delay(5000).then(function () {
    throw new Error("Timed out");
  }),
])
  .then(function (text) {
    console.log(text);
  })
  .catch(function (reason) {
    console.log(reason);
  });
