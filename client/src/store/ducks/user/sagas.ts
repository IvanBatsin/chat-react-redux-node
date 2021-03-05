import { takeEvery, put, call } from 'redux-saga/effects';
import { ISignInUser, ServerUserResponse, userApi } from '../../../API/userApi';
import { IUser } from '../../../interfaces';
import { LoadingState } from '../../../interfaces/loadingState';
import { setUserData, setUserLoadingState, UserActionTypes, IUserSignIn, IUserSignUp } from './actionCreators';

function* fetchGetMe() {
  try {
    yield put(setUserLoadingState(LoadingState.LOADING));
    const {data} = yield call(userApi.getMe);
    yield put(setUserData(data));
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

function* fetchSignUp({payload}: IUserSignUp) {
  try {
    yield put(setUserLoadingState(LoadingState.LOADING));
    const data: ServerUserResponse<IUser> = yield call(userApi.signUp, payload);
    console.log('saga - ', data);
    yield put(setUserData(data.data));
  } catch (error) {
    yield put(setUserLoadingState(LoadingState.ERROR));
  }
}

export function* userSaga(){
  yield takeEvery(UserActionTypes.GET_ME, fetchGetMe);
  yield takeEvery(UserActionTypes.USER_SIGNIN, fetchSignIn);
  yield takeEvery(UserActionTypes.USER_SIGNUP, fetchSignUp);
}