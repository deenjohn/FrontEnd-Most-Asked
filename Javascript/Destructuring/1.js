const obj = { first: "Jane", last: "Doe" };
const { first: f, last: l } = obj;
// f = 'Jane'; l = 'Doe'

// {prop} is short for {prop: prop}
const { first, last } = obj;
// first = 'Jane'; last = 'Doe'
