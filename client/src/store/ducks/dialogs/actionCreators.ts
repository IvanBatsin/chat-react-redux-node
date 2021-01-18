import { Action } from "redux";
import { IUser } from "../../../interfaces";
import { IDialog } from '../../../interfaces/dialog';
import { LoadingState } from "../../../interfaces/loadingState";

export enum DialogsActionTypes {
  SET_DATA_DIALOGS = 'dialogs/SET_DATA_DIALOGS',
  FETCH_DIALOGS = 'dialogs/FETCH_DIALOGS',
  SET_DIALOGS_LOADING_STATUS = 'dialogs/SET_DIALOGS_LOADING_STATUS',
  SET_DIALOGS_INITIAL = 'dialogs/SET_DIALOGS_INITIAL'
}

// interfaces
export interface ISetDialogsData extends Action<DialogsActionTypes> {
  type: DialogsActionTypes.SET_DATA_DIALOGS,
  payload: IDialog[] | undefined
}
export interface IFetchDialogsData extends Action<DialogsActionTypes> {
  type: DialogsActionTypes.FETCH_DIALOGS,
  payload: IUser['_id']
}
export interface ISetDialogsLoadingStatus extends Action<DialogsActionTypes> {
  type: DialogsActionTypes.SET_DIALOGS_LOADING_STATUS,
  payload: LoadingState
}
export interface ISetDialodsToInitial extends Action<DialogsActionTypes> {
  type: DialogsActionTypes.SET_DIALOGS_INITIAL
}

// Action creators
export const setDialogsData = (payload: IDialog[] | undefined): ISetDialogsData => ({
  type: DialogsActionTypes.SET_DATA_DIALOGS,
  payload
})
export const fetchDialogs = (payload:  IUser['_id']): IFetchDialogsData => ({
  type: DialogsActionTypes.FETCH_DIALOGS,
  payload
})
export const setDialogsLoadingStatus = (payload: LoadingState): ISetDialogsLoadingStatus => ({
  type: DialogsActionTypes.SET_DIALOGS_LOADING_STATUS,
  payload
})
export const setDialogsToInitial = (): ISetDialodsToInitial => ({
  type: DialogsActionTypes.SET_DIALOGS_INITIAL
})

export type DialogsAction = ISetDialogsData | IFetchDialogsData | ISetDialogsLoadingStatus | ISetDialodsToInitial;