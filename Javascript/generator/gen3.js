function* gen() {
    // Pass a question to the outer code and wait for an answer
    yield 1;
    return 5;
    yield 2;
    yield 3;
  }
  
  let generator = gen();
  console.log('gen ran')
  let {value}= generator.next(); //executes code inside gen function
  console.log('value ',value)
  console.log(generator.next().value)
 
