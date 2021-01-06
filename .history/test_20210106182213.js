
function test() {

  setTimeout(()=> {
    console.log(x);
    console.log(y);
  }, 1000);

  var x = 2;
  let y = 3;
}

test();