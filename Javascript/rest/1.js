const obj = {};
[first, ...obj.prop] = ["a", "b", "c"];

console.log(obj.prop);

const [first, ...rest] = ["a", "b", "c"];
// first = 'a'; rest = ['b', 'c']
