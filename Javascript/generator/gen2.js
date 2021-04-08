function test(value) {
  return value;
}

function* gen() {
  let count = 0;
  // Pass a question to the outer code and wait for an answer
  let result = yield test(count--); // (*)

  console.log(result);
}

let generator = gen();
console.log(generator.next());
