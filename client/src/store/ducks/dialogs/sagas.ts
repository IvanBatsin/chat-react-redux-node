import { call, put, takeEvery } from 'redux-saga/effects';
import { LoadingState } from '../../../interfaces/loadingState';
import { dialogsApi, AllDialogsResponse } from '../../../API/dialogApi';
import { setDialogsLoadingStatus, setDialogsData, DialogsActionTypes, IFetchDialogsData } from './actionCreators';
import { colorPicker } from '../../../helpers/colorPicker';
 

function* fetchDialogs({payload}: IFetchDialogsData){
  try {
    yield put(setDialogsData(undefined));
    yield put(setDialogsLoadingStatus(LoadingState.LOADING));

    const data: AllDialogsResponse = yield call(dialogsApi.fetchAllDialogs, payload);

    if (data.status === 'error') {
      yield put(setDialogsLoadingStatus(LoadingState.ERROR));
    } else {
      data.data.forEach(dialog => {
        dialog.author.bgColor = colorPicker();
        dialog.partner.bgColor = colorPicker();
      });
      yield put(setDialogsData(data.data));
    }
  } catch (err) {
    console.log('saga error');
    yield put(setDialogsLoadingStatus(LoadingState.ERROR));
  }
}

export function* dialogsSaga(){
  yield takeEvery(DialogsActionTypes.FETCH_DIALOGS, fetchDialogs);
}