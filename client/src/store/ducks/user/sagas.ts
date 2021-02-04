import { takeEvery, put, call } from 'redux-saga/effects';
import { ISignInUser, userApi } from '../../../API/userApi';
import { LoadingState } from '../../../interfaces/loadingState';
import { setUserData, setUserLoadingState, UserActionTypes, IUserSignIn } from './actionCreators';

function* fetchGetMe() {
  try {
    yield put(setUserLoadingState(LoadingState.LOADING));
    const data = yield call(userApi.getMe);
    yield put(setUserData(data.data));
  } catch (error) {
    yield put(setUserLoadingState(LoadingState.ERROR));
  }
}

function* fetchSignIn({payload}: IUserSignIn) {
  try {
    yield put(setUserLoadingState(LoadingState.LOADING));
    const data: ISignInUser = yield call(userApi.signIn, payload);
    window.localStorage.setItem('token', JSON.stringify(data.token));
    yield put(setUserData(data.data));
  } catch (error) {
    yield put(setUserLoadingState(LoadingState.ERROR));
  }
}

export function* userSaga(){
  yield takeEvery(UserActionTypes.GET_ME, fetchGetMe);
  yield takeEvery(UserActionTypes.USER_SIGNIN, fetchSignIn)
}