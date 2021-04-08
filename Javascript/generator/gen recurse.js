function* foo() {
  yield "a";
  yield "b";
}

function* bar() {
  yield "x";
  foo(); // does nothing!
  yield "y";
}

function* barNew() {
  yield "x";
  yield* foo(); // calls and execute
  yield "y";
}

// Collect all values yielded by bar() in an array
const arr = [...barNew()];
// ['x', 'a', 'b', 'y']
