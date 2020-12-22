import { combineReducers } from 'redux';
import { messagesReducer } from './ducks/messages/reducer';
import { dialogsReducer } from './ducks/dialogs/reducer';
import { userReducer } from './ducks/user/reducer';

export const rootReducer = combineReducers({
  messages: messagesReducer,
  dialogs: dialogsReducer,
  user: userReducer
});