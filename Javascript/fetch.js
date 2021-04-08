async function fetchJson(url) {
  return Promise.resolve(1);
}

fetchJson("http://example.com/some_file.json").then((obj) => console.log(obj));
console.log("hello");
