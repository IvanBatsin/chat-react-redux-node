import { takeEvery, put, call } from 'redux-saga/effects';
import { userApi } from '../../../API/userApi';
import { LoadingState } from '../../../interfaces/loadingState';
import { setUser, setUserLoadingState, UserActionTypes } from './actionCreators';

function* fetchGetMe() {
  try {
    yield put(setUserLoadingState(LoadingState.LOADING));
    const data = yield call(userApi.getMe);
    yield put(setUser(data.data));
  } catch (error) {
    yield put(setUserLoadingState(LoadingState.ERROR));
  }
}

export function* userSaga(){
  yield takeEvery(UserActionTypes.GET_ME, fetchGetMe);
}