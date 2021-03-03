const { createStore, applyMiddleware } =require('redux')
const createSagaMiddleware =require('redux-saga').default
const { takeEvery ,take,fork}=require('redux-saga/effects') 
const {delay} =require('redux-saga')
const sagaMiddleware = createSagaMiddleware()
const reducer=(state=[],action)=>{return [...state,action.type];}
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
)
function* takeSaga() {
  while(true){
    const action=yield take('testTake')
    console.log(action)
    yield delay(1000)
  }
}

function* takeEverySaga() {
    yield takeEvery('testTakeEvery',function* (action){
        console.log(action)
        yield delay(1000)
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

sagaMiddleware.run(takeSaga)
sagaMiddleware.run(takeEverySaga)
sagaMiddleware.run(takeSagaWithFork)

const main=async ()=>{
    store.dispatch({type: 'testTake'})
    store.dispatch({type: 'testTake'})
    store.dispatch({type: 'testTakeEvery'})
    store.dispatch({type: 'testTakeEvery'})
    store.dispatch({type: 'testTakeWithFork'})
    store.dispatch({type: 'testTakeWithFork'})
}

main();