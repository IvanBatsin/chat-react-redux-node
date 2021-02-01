import produce, {Draft} from 'immer';
import { MessagesState } from './state';
import { LoadingState } from '../../../interfaces/loadingState';
import { MessagesAction, MessagesActionTypes } from './actionCreators';
 
const initialState: MessagesState = {
  data: undefined,
  loadingState: LoadingState.NEVER
}

export const messagesReducer = produce((draft: Draft<MessagesState>, action: MessagesAction) => {
  switch(action.type) {
    case MessagesActionTypes.SET_MESSAGES_DATA: {
      draft.data = action.payload;
      draft.loadingState = LoadingState.LOADED;
      break;
    }

    case MessagesActionTypes.SET_MESSAGES_LOADING_STATUS: {
      draft.loadingState = action.payload;
      draft.data = undefined;
      break;
    }

    case MessagesActionTypes.SET_MESSAGES_TO_INITIAL: {
      draft.loadingState = LoadingState.NEVER;
      draft.data = undefined;
      break;
    }

    default: break;
  }
}, initialState)