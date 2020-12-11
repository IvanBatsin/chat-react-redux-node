import { Action } from "redux";
import { IDialog } from '../../../interfaces/dialog';
import { LoadingState } from "../../../interfaces/loadingState";

export enum DialogsActionTypes {
  SET_DATA_DIALOGS = 'dialogs/SET_DATA_DIALOGS',
  FETCH_DIALOGS = 'dialogs/FETCH_DIALOGS',
  SET_DIALOGS_LOADING_STATUS = 'dialogs/SET_DIALOGS_LOADING_STATUS',
  SEARCH_DIALOG = 'dialogs/SEARCH_DIALOG' 
}

// interfaces
export interface ISetDialogsData extends Action<DialogsActionTypes> {
  type: DialogsActionTypes.SET_DATA_DIALOGS,
  payload: IDialog[] | undefined
}
export interface IFetchDialogsData extends Action<DialogsActionTypes> {
  type: DialogsActionTypes.FETCH_DIALOGS
}
export interface ISetDialogsLoadingStatus extends Action<DialogsActionTypes> {
  type: DialogsActionTypes.SET_DIALOGS_LOADING_STATUS,
  payload: LoadingState
}
export interface ISearchDialog extends Action<DialogsActionTypes> {
  type: DialogsActionTypes.SEARCH_DIALOG,
  payload: string
}

// Action creators
export const setDialogsData = (payload: IDialog[]): ISetDialogsData => ({
  type: DialogsActionTypes.SET_DATA_DIALOGS,
  payload
})
export const fetchDialogs = (): IFetchDialogsData => ({
  type: DialogsActionTypes.FETCH_DIALOGS,
})
export const setDialogsLoadingStatus = (payload: LoadingState): ISetDialogsLoadingStatus => ({
  type: DialogsActionTypes.SET_DIALOGS_LOADING_STATUS,
  payload
})
export const searchDialog = (payload: string): ISearchDialog => ({
  type: DialogsActionTypes.SEARCH_DIALOG,
  payload
})

export type DialogsAction = ISetDialogsData | IFetchDialogsData | ISetDialogsLoadingStatus | ISearchDialog;