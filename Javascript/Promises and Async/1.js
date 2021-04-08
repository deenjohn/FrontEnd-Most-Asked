var p = new Promise((resolve, reject) => {
  return Promise.reject(Error("The Fails!"));
});
console.log(p);
p.catch((error) => console.log(error.message));
p.catch((error) => console.log(error.message));
