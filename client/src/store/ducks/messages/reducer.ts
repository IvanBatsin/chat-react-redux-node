import produce, {Draft} from 'immer';
import { MessagesState } from './state';
import { LoadingState } from '../../../interfaces/loadingState';
import { MessagesAction, MessagesActionTypes } from './actionCreators';
 
const initialState: MessagesState = {
  data: undefined,
  status: LoadingState.NEVER
}

export const messagesReducer = produce((draft: Draft<MessagesState>, action: MessagesAction) => {
  switch(action.type) {
    case MessagesActionTypes.SET_MESSAGES_DATA: {
      draft.data = action.payload;
      draft.status = LoadingState.LOADED;
      break;
    }

    case MessagesActionTypes.SET_MESSAGES_LOADING_STATUS: {
      draft.status = action.payload;
      break;
    }

    case MessagesActionTypes.SET_MESSAGES_TO_INITIAL: {
      draft.status = LoadingState.NEVER;
      draft.data = undefined;
      break;
    }

    default: break;
  }
}, initialState)