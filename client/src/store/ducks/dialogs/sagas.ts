import { call, put, takeEvery } from 'redux-saga/effects';
import { LoadingState } from '../../../interfaces/loadingState';
import { dialogsApi } from '../../../API/dialogApi';
import { setDialogsLoadingStatus, setDialogsData, DialogsActionTypes, IFetchDialogsData } from './actionCreators';
import { colorPicker } from '../../../helpers/colorPicker';
import { IDialog } from '../../../interfaces/dialog';
import { ServerResponse } from '../../../interfaces/forms';
 

function* fetchDialogs({payload}: IFetchDialogsData){
  try {
    yield put(setDialogsLoadingStatus(LoadingState.LOADING));
    const data: ServerResponse<IDialog[]> = yield call(dialogsApi.fetchAllDialogs, payload);
    
    if (data.data.length) {
      data.data.forEach(dialog => {
        dialog.author.bgColor = colorPicker();
        dialog.partner.bgColor = colorPicker();
      });
    }
    yield put(setDialogsData(data.data));
  } catch (err) {
    console.log('saga error');
    yield put(setDialogsLoadingStatus(LoadingState.ERROR));
  }
}

export function* dialogsSaga(){
  yield takeEvery(DialogsActionTypes.FETCH_DIALOGS, fetchDialogs);
}