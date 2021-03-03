var delayGen = function*() {
    // Pass a question to the outer code and wait for an answer
    yield new Promise((res,rej)=>setTimeout(res,5000)); //wait 5sec
    return 5;
  }
  
  let gen = delayGen();
  console.log('gen ran')
   //executes code inside gen function
   gen.next().value.then((x)=>{
    console.log('x ',x);
    console.log(gen.next().value)
   })
