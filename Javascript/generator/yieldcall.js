function greet(){
  return 'greet';
}

function* gen() {
    // Pass a question to the outer code and wait for an answer
    const result = yield greet(); // return 'greet'
    console.log("result ",result)
  }
  
  let generator = gen();
  console.log('gen ran')
  let {value}= generator.next('start'); //executes code inside gen function
  console.log('value ',value)
  generator.next(value)
  
 
