// for-of creates one binding (storage space for a variable) per loop iteration

for (const x of ["a", "b"]) {
  console.log(x);
}

function func() {
  const foo = 5;
  if (true) {
    const foo = 10; // shadows outer `foo`
    console.log(foo); // 10
  }
  console.log(foo); // 5
}

func();
