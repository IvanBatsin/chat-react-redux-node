import { call, put, takeEvery } from 'redux-saga/effects';
import { messagesApi, ServerMessageResponse } from '../../../API/messageApi';
import { LoadingState } from '../../../interfaces/loadingState';
import { IMessage } from '../../../interfaces/message';
import { setMessagesData, setMessagesLoadingStatus, MessagesActionTypes, IFetchMessagesData } from './actionCreators';

function* fetchMessagesSaga({payload}: IFetchMessagesData) {
  try {
    yield put(setMessagesLoadingStatus(LoadingState.LOADING));
    const data: ServerMessageResponse<IMessage[]> = yield call(messagesApi.fetchMessages, payload);
    yield put(setMessagesData(data.data));
  } catch (err) {
    console.log(err);
    yield put(setMessagesLoadingStatus(LoadingState.ERROR));
  }
}

export function* messagesSaga() {
  yield takeEvery(MessagesActionTypes.FETCH_MESSAGES, fetchMessagesSaga);
}