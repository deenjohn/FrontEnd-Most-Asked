function* gen() {
  console.log('generator begins ');
  // Pass a question to the outer code and wait for an answer
  let result = yield "2 + 2 = ?"; // ist generator.next() returns 2 + 2 = ? ,and stays at this line

  console.log('result ',result); // 2nd gen.next()
}

let generator = gen();
console.log('gen ran')
let {value}= generator.next(); //executes code inside gen function
console.log('value ',value)
// generator.next('name');