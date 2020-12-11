import { call, put, takeEvery } from 'redux-saga/effects';
import { LoadingState } from '../../../interfaces/loadingState';
import { IDialog } from '../../../interfaces/dialog';
import { dialogsApi } from '../../../API/fetchDialogs';
import { setDialogsLoadingStatus, setDialogsData, DialogsActionTypes } from './actionCreators';

function* fetchDialogs(){
  try {
    yield put(setDialogsLoadingStatus(LoadingState.LOADING));
    const data: IDialog[] = yield call(dialogsApi.fetchAllDialogs);
    yield put(setDialogsData(data));
  } catch (err) {
    console.log(err);
    yield put(setDialogsLoadingStatus(LoadingState.ERROR));
  }
}

export function* dialogsSaga(){
  yield takeEvery(DialogsActionTypes.FETCH_DIALOGS, fetchDialogs);
}