const { Component, useState, useEffect } = React;
const { render } = ReactDOM;
const { Provider, connect } = ReactRedux;
const {
  createStore,
  bindActionCreators,
  combineReducers,
  applyMiddleware,
} = Redux;

const createSagaMiddleware = ReduxSaga.default;
const sagaMiddleware = createSagaMiddleware();
const { take, takeEvery, put, call, race ,all} = ReduxSaga.effects;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Our worker Saga: will perform the async increment task
function* incrementAsync() {
  yield delay(1000);
  yield put({ type: "INCREMENT" }); // action creation , same like dispatch
  console.log('end incrementAsync');
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
  // takes every matching action and run the given saga
  console.log('end watchIncrementAsync');
}

// middlewares
const thunkMiddleware = ({ dispatch, getState }) => (next) => (action) =>
  typeof action === "function" ? action(dispatch, getState) : next(action);

const loggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", storeAPI.getState());
  return result;
};

// action creator thunk
const fetchUser = () =>
  // action creator, when invoked…
  (
    dispatch // …returns thunk; when invoked with `dispatch`…
  ) =>
    window
      .fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((user) => {
        dispatch({
          type: "ADD_TODO",
          id: nextTodoId++,
          name: user[0].title,
          completed: false,
        });
        dispatch({
          type: "INCREMENT_ASYNC"
        });
      });

// reducers
const toggle = (todo, action) => {
  if (todo.id !== action.id) {
    return todo;
  }
  if (todo.id === action.id) {
    return {
      ...todo,
      completed: !todo.completed,
    };
  }
};

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          completed: action.completed,
        },
      ];
      break;
    case "TOGGLE_TODO":
      return state.map((t) => toggle(t, action));
      break;
    default:
      return state; // don't change state
  }
};

const visibilityFilterReducer = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state; // don't change state
  }
};

const incDecReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    default:
      return state; // don't change state
  }
};

/*
state = {
  todos: [],
  visibilityFilter: "some string",
  incDecReducer: 0
}

*/

const todoApp = combineReducers({
  todos: todoReducer,
  visibilityFilter: visibilityFilterReducer,
  incDecCounter: incDecReducer
});

/*

configureStore({
  reducer: {
    counter: counterReducer
  }
})
*/

const store = createStore(
  todoApp,
  applyMiddleware(thunkMiddleware, loggerMiddleware, sagaMiddleware)
);

function* rootSaga() {
  yield all([watchIncrementAsync()]);
}
sagaMiddleware.run(rootSaga);


window.store = store;
let nextTodoId = 0;

var btnStyle = {
  position: "relative",
  left: "10px",
};

// components
class TodoAdd extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  // componentDidUpdate(){
  //   console.log('componentDidUpdate')
  //   this.myRef.current = null;
  // }
  render() {
    return (
      <>
        <input type="text" ref={this.myRef} />
        <input
          type="button"
          className="btn btn-primary btn-lg"
          value="Add"
          style={btnStyle}
          onClick={() => {
            this.props.dispatch(fetchUser());
            this.myRef.current.value = null;
          }}
        />
      </>
    );
  }
}

const TodoAddConnected = connect()(TodoAdd);

// class TodoAdd extends React.Component {
//   render() {
//     return <input type="text" />;
//   }
// }

var filterTodosStyle = {
  position: "relative",
  top: "38px",
  left: "23px",
};

class FilterTodos extends React.Component {
  
  render() {
    console.log('render filtertodos');
    console.log("FilterTodos ", this.props);
    return (
      <div style={filterTodosStyle}>
        Show :
        <input
          type="button"
          className={`btn btn-light ${
            this.props.visibilityFilter === "SHOW_ALL" ? "active" : null
          }`}
          value="All"
          onClick={() =>
            this.props.dispatch({
              type: "SET_VISIBILITY_FILTER",
              filter: "SHOW_ALL",
            })
          }
        />
        <input
          type="button"
          className={`btn btn-light ${
            this.props.visibilityFilter === "SHOW_ACTIVE" ? "active" : null
          }`}
          value="Active"
          onClick={() =>
            this.props.dispatch({
              type: "SET_VISIBILITY_FILTER",
              filter: "SHOW_ACTIVE",
            })
          }
        />
        <input
          type="button"
          className={`btn btn-light ${
            this.props.visibilityFilter === "SHOW_COMPLETED" ? "active" : null
          }`}
          value="Completed"
          onClick={() =>
            this.props.dispatch({
              type: "SET_VISIBILITY_FILTER",
              filter: "SHOW_COMPLETED",
            })
          }
        />
      </div>
    );
  }
}

const mapStateToPropsFilterTodos = (state, ownProps) => {
  console.log("ownProps mapStateToPropsFilterTodos", ownProps);
  return {
    visibilityFilter: state.visibilityFilter
  };
};

const FilterTodosConnected = connect(mapStateToPropsFilterTodos)(FilterTodos);

class TodoList extends React.Component {
  render() {
    console.log("TodoList ", this.props);
    return this.props.todos
      ? this.props.todos.map((t) => (
          <li key={t.id} onClick={() => this.props.onTodoClick(t.id)}>
            {t.name}
          </li>
        ))
      : null;
  }
}

// const mapStateToProps = (state) => ({ todos: state.todos });

// const TodoListConnected = connect(mapStateToProps)(TodoList);

const divStyle = {
  left: "20px",
  position: "relative",
  top: "25px",
  padding: "0 5px",
};

const todoListStyle = {
  left: "20px",
  position: "relative",
  top: "60px",
};

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter((t) => t.completed);
    case "SHOW_ACTIVE":
      return todos.filter((t) => !t.completed);
  }
};

class VisbilityTodoList extends Component {
  render() {
    console.log("VisbilityTodoList ", this.props);
    return (
      <TodoList
        todos={getVisibleTodos(this.props.todos, this.props.visibilityFilter)}
        onTodoClick={(id) =>
          store.dispatch({
            type: "TOGGLE_TODO",
            id,
          })
        }
      />
    );
  }
}

const mapStateToPropsVisbilityTodoList = (state) => state;

const VisbilityTodoListConnected = connect(mapStateToPropsVisbilityTodoList)(
  VisbilityTodoList
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div style={divStyle}>
          <TodoAddConnected />
        </div>
        <FilterTodosConnected test="test" />
        {/*  test="test" ownprop */}
        <div style={todoListStyle}>
          <VisbilityTodoListConnected />
        </div>
      </Provider>
    );
  }
}

render(<App />, document.getElementById("root"));
