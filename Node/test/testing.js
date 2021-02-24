const utils = require("./util");
const thumbWar = require("./thumbWar");

const originalGetWinner = utils.getWinner; // override getWinner
utils.getWinner = function winner(p1, p2) {
  return p1;
};

let winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
console.log("a.winner ", winner);

winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
console.log("a.winner ", winner);

// cleanup
utils.getWinner = originalGetWinner;
