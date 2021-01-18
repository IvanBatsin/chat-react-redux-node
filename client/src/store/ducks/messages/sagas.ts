import { call, put, takeEvery } from 'redux-saga/effects';
import { messagesApi, MessagesResponse } from '../../../API/fetchMessages';
import { LoadingState } from '../../../interfaces/loadingState';
import { setMessagesData, setMessagesLoadingStatus, MessagesActionTypes, IFetchMessagesData } from './actionCreators';

function* fetchMessagesSaga({payload}: IFetchMessagesData) {
  try {
    yield put(setMessagesLoadingStatus(LoadingState.LOADING));

    const data: MessagesResponse = yield call(messagesApi.fetchMessages, payload);

    if (data.status === 'error') {
      yield put(setMessagesLoadingStatus(LoadingState.ERROR));
    } else {
      yield put(setMessagesData(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(setMessagesLoadingStatus(LoadingState.ERROR));
  }
}

export function* messagesSaga() {
  yield takeEvery(MessagesActionTypes.FETCH_MESSAGES, fetchMessagesSaga);
}