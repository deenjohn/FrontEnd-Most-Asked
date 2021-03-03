import { delay } from "redux-saga";
import { takeLatest, put ,takeEvery} from "redux-saga/effects";
import { AGE_UP_ASYNC , AGE_DOWN_ASYNC,AGE_DOWN,AGE_UP } from "../constants/actions";

function* ageUpAsync() {
  yield delay(4000);
  yield put({ type: AGE_UP_ASYNC, value: 1 });
}


export function* watchAgeUp() {
  yield takeLatest(AGE_UP, ageUpAsync);
}

function* ageDownAsync() {
  yield delay(4000); // make async
  yield put({ type: AGE_DOWN_ASYNC, value: 1 }); //dispatch action to reducer
}

//https://flaviocopes.com/redux-saga/

export function* watchAgeDown() {
  yield takeEvery(AGE_DOWN, ageDownAsync);
}
