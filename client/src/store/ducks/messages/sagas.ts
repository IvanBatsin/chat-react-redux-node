import { call, put, takeEvery } from 'redux-saga/effects';
import { messagesApi } from '../../../API/fetchMessages';
import { IMessage } from '../../../interfaces';
import { LoadingState } from '../../../interfaces/loadingState';
import { setMessagesData, setMessagesLoadingStatus, MessagesActionTypes } from './actionCreators';

function* fetchMessagesSaga() {
  try {
    yield put(setMessagesLoadingStatus(LoadingState.LOADING));
    const data: IMessage[] = yield call(messagesApi.fetchMessages);
    yield put(setMessagesData(data));
  } catch (err) {
    console.log(err);
    yield put(setMessagesLoadingStatus(LoadingState.ERROR));
  }
}

export function* messagesSaga() {
  yield takeEvery(MessagesActionTypes.FETCH_MESSAGES, fetchMessagesSaga);
}