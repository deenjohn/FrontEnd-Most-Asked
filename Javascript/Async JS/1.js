async function f() {
  console.log("0");
  return "I am groot";
}

f().then((x) => {
  console.log("1: ", x);
});

(async () => {
  await f();
})();

console.log("2");
