import produce, { Draft } from 'immer';
import { UserAction, UserActionTypes } from './actionCreators';
import { UserState } from './state';

const initialState = {
  user: undefined
}

export const userReducer = produce((draft: Draft<UserState>, action: UserAction) => {
  switch(action.type){
    case UserActionTypes.SET_USER: {
      draft.user = action.payload;
      break;
    }

    case UserActionTypes.SER_PARTNER: {
      draft.partner = action.payload;
      break;
    }

    default: break;
  }
}, initialState);