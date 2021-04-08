async function main() {
  const x = await asyncFunc(); // (A)
  console.log("Result: " + x); // (B)

  // Same as:
  // asyncFunc()
  // .then(x => console.log('Result: '+x));
}
main();
/*
The body of main() expresses well what’s going on conceptually, 
how we usually think about asynchronous computations. Namely, 
asyncFunc() is a blocking function call:

Line A: Wait until asyncFunc() is finished.
Line B: Then log its result x.
*/
