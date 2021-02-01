import produce, { Draft } from 'immer';
import { LoadingState } from '../../../interfaces/loadingState';
import { UserAction, UserActionTypes } from './actionCreators';
import { UserState } from './state';

const initialState: UserState = {
  user: undefined,
  partner: undefined,
  loadingState: LoadingState.NEVER
}

export const userReducer = produce((draft: Draft<UserState>, action: UserAction) => {
  switch(action.type){
    case UserActionTypes.SET_USER_LOADING_STATE: {
      draft.user = undefined;
      draft.partner = undefined;
      draft.loadingState = action.payload;
      break;
    }

    case UserActionTypes.SET_USER: {
      draft.user = action.payload;
      draft.loadingState = LoadingState.LOADED
      break;
    }

    case UserActionTypes.SER_PARTNER: {
      draft.partner = action.payload;
      break;
    }

    case UserActionTypes.USER_EXIT: {
      draft.user = undefined;
      draft.partner = undefined;
      draft.loadingState = LoadingState.NEVER;
      break;
    }

    default: break;
  }
}, initialState);