function* range(start, end) {
  while (start < end) yield start++;
}

for (let value of range(0, 10)) {
  console.log(value);
}

console.log([...range(0, 100)]);
