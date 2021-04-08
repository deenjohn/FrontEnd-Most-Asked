// mixin
let sayHiMixin = {
  sayHi() {
    console.log(`Hello ${this.name}`);
  },
  sayBye() {
    console.log(`Bye ${this.name}`);
  },
};

let greetMixin = {
  greet() {
    console.log("greet");
  },
};

// usage:
class User {
  constructor(name) {
    this.name = name;
  }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);
Object.assign(User.prototype, greetMixin);

// now User can say hi
let user = new User("Dude");
user.sayHi(); // Hello Dude
user.greet(); // Hello Dude
