import { LoadingState } from "../../../interfaces/loadingState";
import { DialogsState } from "./state";
import produce, {Draft} from 'immer';
import { DialogsAction, DialogsActionTypes } from './actionCreators';

const initialState: DialogsState = {
  data: undefined,
  status: LoadingState.NEVER
}

export const dialogsReducer = produce((draft: Draft<DialogsState>, action: DialogsAction) => {
  switch (action.type) {
    case DialogsActionTypes.SET_DATA_DIALOGS: {
      draft.data = action.payload;
      draft.status = LoadingState.LOADED;
      break;
    }

    case DialogsActionTypes.SEARCH_DIALOG: {
      draft.data = draft.data?.filter(item => item.user.fullName.toUpperCase().indexOf(action.payload.toUpperCase()) >= 0);
      break;
    }

    case DialogsActionTypes.SET_DIALOGS_LOADING_STATUS: {
      draft.status = action.payload;
      break;
    }

    default: break;
  }
}, initialState)