console.log('hello');

setTimeout(()=>{
  console.log('1');
  setTimeout(()=>{
    console.log('2');
    setTimeout(()=>{
      console.log('3')
    },0)
  },0)
},0);

Promise.resolve(4).then((x)=>{
  console.log(x);
}).then(()=>{
  console.log('end promise')
})
console.log('end');