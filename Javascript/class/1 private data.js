class Countdown {
  constructor(counter, action) {
    //action and counter are private
    Object.assign(this, {
      dec() {
        if (counter < 1) return;
        counter--;
        if (counter === 0) {
          action();
        }
      },
    });
  }
}
