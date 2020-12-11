import { combineReducers } from 'redux';
import { messagesReducer } from './ducks/messages/reducer';
import { dialogsReducer } from './ducks/dialogs/reducer';

export const rootReducer = combineReducers({
  messages: messagesReducer,
  dialogs: dialogsReducer
});