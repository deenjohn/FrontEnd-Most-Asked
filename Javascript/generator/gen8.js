let names = ["John", "Mindy", "Sally"];

let result = names
  .filter((name) => name.includes("y"))
  .map((name) => name.toLocaleLowerCase());
console.log(result);

function* format(array) {
  for (let value of array) {
    if (value.includes("y")) {
      yield value.toLowerCase();
      // return; // find ist array value that includes y and return
    }
  }
}

console.log([...format(names)]);
