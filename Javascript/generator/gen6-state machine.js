function* stateMachine(state) {
  let transition;
  while (true) {
    if (transition === "INCREMENT") {
      state++;
    }
    if (transition === "DECREMENT") {
      state--;
    }
    transition = yield state;
  }
}

const iterator = stateMachine(0);

console.log(iterator.next());
console.log(iterator.next("INCREMENT"));
console.log(iterator.next("INCREMENT"));
console.log(iterator.next("DECREMENT"));
