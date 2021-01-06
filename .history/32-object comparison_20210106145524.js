function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
        break;
      //return false;
    }
  }

  return true;
}
const hero1 = {
  name: 'Batman'
};
const hero2 = {
  name: 'deen'
};
const hero3 = {
  name: 'Joker'
};


console.log(shallowEqual(obj1,obj2))
