// If you want both index and value of each array element,
// for-of has got you covered, too, via the new Array method entries() and destructuring:

var arr = [1, 2, 3];
for (const [index, elem] of arr.entries()) {
  console.log(index + ". " + elem);
}
