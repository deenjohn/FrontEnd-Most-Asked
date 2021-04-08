function* gen() {
  console.log("generator begins ");
  // Pass a question to the outer code and wait for an answer
  let result = yield "2 + 2 = ?"; // ist generator.next() returns 2 + 2 = ? ,and stays at this line. value :  "2 + 2 = ?"

  console.log("result ", result); // 2nd gen.next()
}

let generator = gen(); // runs generator but not the ist line inside function
console.log("gen called");

let { value } = generator.next(); //executes code inside gen function
console.log("value ", value);
// generator.next('name');
