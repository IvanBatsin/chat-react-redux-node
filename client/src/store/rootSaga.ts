import { all } from 'redux-saga/effects';
import { messagesSaga } from './ducks/messages/sagas';
import { dialogsSaga } from './ducks/dialogs/sagas';

export function* rootSaga(){
  yield all([
    messagesSaga(),
    dialogsSaga()
  ]);
}