function httpGet(x) {
  return new Promise((res, rej) => {
    console.log("inside promise ", x);
    setTimeout(() => res(`done ${x}`), 6000);
  });
}

const fileUrls = [
  "http://example.com/file1.txt",
  "http://example.com/file2.txt",
];
const promisedTexts = fileUrls.map(httpGet);
console.log(promisedTexts);

Promise.all(promisedTexts)
  .then((texts) => {
    for (const text of texts) {
      console.log(text);
    }
  })
  .catch((reason) => {
    // Receives first rejection among the Promises
  });
