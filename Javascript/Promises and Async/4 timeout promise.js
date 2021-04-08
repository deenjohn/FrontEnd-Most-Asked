function httpGet() {
  return new Promise((res, rej) => {
    setTimeout(() => res("done"), 6000);
  });
}

function timeout(ms, promise) {
  return new Promise(function (resolve, reject) {
    promise.then(() => resolve("done early")); // async 1

    // async 2
    setTimeout(function () {
      reject(new Error("Timeout after " + ms + " ms")); // (A)
    }, ms);
  });
}

// timeout after 500 sec delay if httpGet takes longer
timeout(5000, httpGet("http://example.com/file.txt"))
  .then(function (value) {
    console.log("Contents: " + value);
  })
  .catch(function (reason) {
    console.error("Error or timeout", reason);
  });
