import { all } from 'redux-saga/effects';
import { messagesSaga } from './ducks/messages/sagas';
import { dialogsSaga } from './ducks/dialogs/sagas';
import { userSaga } from './ducks/user/sagas';

export function* rootSaga(){
  yield all([
    messagesSaga(),
    dialogsSaga(),
    userSaga()
  ]);
}