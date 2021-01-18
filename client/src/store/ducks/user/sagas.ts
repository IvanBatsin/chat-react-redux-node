import { takeEvery, put } from 'redux-saga/effects';
import { setUserToInitial, UserActionTypes } from './actionCreators';
import { setDialogsToInitial } from '../dialogs/actionCreators';
import { setMessagesToInitial } from '../messages/actionCreators';

function* userExit(){
  yield put(setMessagesToInitial());
  yield put(setDialogsToInitial());
  yield put(setUserToInitial());
}

export function* userSaga(){
  yield takeEvery(UserActionTypes.USER_EXIT, userExit);
}