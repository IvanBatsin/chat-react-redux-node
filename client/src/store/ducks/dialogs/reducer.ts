import { LoadingState } from "../../../interfaces/loadingState";
import { DialogsState } from "./state";
import produce, {Draft} from 'immer';
import { DialogsAction, DialogsActionTypes } from './actionCreators';

const initialState: DialogsState = {
  data: undefined,
  loadingState: LoadingState.NEVER
}

export const dialogsReducer = produce((draft: Draft<DialogsState>, action: DialogsAction) => {
  switch (action.type) {
    case DialogsActionTypes.SET_DATA_DIALOGS: {
      draft.data = action.payload;
      draft.loadingState = LoadingState.LOADED;
      break;
    }

    case DialogsActionTypes.SET_DIALOGS_LOADING_STATUS: {
      draft.loadingState = action.payload;
      draft.data = undefined;
      break;
    }

    case DialogsActionTypes.SET_DIALOGS_INITIAL: {
      draft.loadingState = LoadingState.NEVER;
      draft.data = undefined;
      break;
    }

    default: break;
  }
}, initialState)