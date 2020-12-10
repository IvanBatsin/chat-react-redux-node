import { combineReducers } from 'redux';
import { messagesReducer } from './ducks/messages/reducer';

export const rootReducer = combineReducers({
  messages: messagesReducer
});