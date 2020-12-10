import { all } from 'redux-saga/effects';
import { messagesSaga } from './ducks/messages/sagas'

export function* rootSaga(){
  yield all([
    messagesSaga()
  ]);
}