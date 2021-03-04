//https://stackoverflow.com/questions/47909392/best-way-to-listen-for-actions-in-saga-whiletrue-take-vs-whiletake

const { createStore, applyMiddleware } =require('redux')
const createSagaMiddleware =require('redux-saga').default
const { takeEvery ,take,fork,put}=require('redux-saga/effects') 
const {delay} =require('redux-saga');
 require('isomorphic-fetch');

function wait(ms) {
  var start = Date.now(),
      now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}

const sagaMiddleware = createSagaMiddleware()
const reducer=(state=[],action)=>{
  ////console.log('state ',state)
  return [...state,action.type];
}
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
)
function* takeSaga() {
  while(true){
    const action=yield take('testTake')
    console.log(action)
    yield delay(1000) // sleep , no new thread
  }
}

function* takeEverySaga() {
    yield takeEvery('testTakeEvery',function* (action){
        console.log(action)
        yield delay(1000) // even though sleep , it spawns another thread
    })
}
 
function* takeSagaWithFork() {
    while(true){
      const action=yield take('testTakeWithFork')
      yield fork(function*(){
        console.log(action)
        yield delay(1000)
      })
    }
}

function* fetchSaga(){
  // const { user } = yield take(SET_CURRENT_USER);
  // console.log('user ',user);
  // const { id } = user;

  //https://jsonplaceholder.typicode.com/
  const response = yield fetch(`https://jsonplaceholder.typicode.com/todos/1`);
  const items = yield response.json();
  console.log('items : ',items);
}

// fork

// sagaMiddleware.run(takeSaga)
// sagaMiddleware.run(takeEverySaga)
// sagaMiddleware.run(takeSagaWithFork)

sagaMiddleware.run(fetchSaga)

const main=async ()=>{
    // store.dispatch({type: 'testTake'});
    // console.log('wait 5sec')
    // wait(5000)
    // store.dispatch({type: 'testTake'})
    // store.dispatch({type: 'testTakeEvery'})
    // store.dispatch({type: 'testTakeEvery'})
    // store.dispatch({type: 'testTakeWithFork'})
    // store.dispatch({type: 'testTakeWithFork'})
}

main();