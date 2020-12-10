import { LoadingState } from '../../../interfaces/loadingState';
import { Action } from 'redux';
import { IMessage } from '../../../interfaces/message';

export enum MessagesActionTypes {
  SET_MESSAGES_DATA = 'messages/SET_MESSAGES_DATA',
  SET_MESSAGES_LOADING_STATUS = 'messages/SET_MESSAGES_LOADING_STATUS',
  FETCH_MESSAGES = 'messages/FETCH_MESSAGES'
}

// Interfaces
export interface ISetMessagesData extends Action<MessagesActionTypes> {
  type: MessagesActionTypes.SET_MESSAGES_DATA,
  payload: IMessage[] | undefined
}
export interface IFetchMessagesData extends Action<MessagesActionTypes> {
  type: MessagesActionTypes.FETCH_MESSAGES
}
export interface ISetMessagesLoadingStatus extends Action<MessagesActionTypes> {
  type: MessagesActionTypes.SET_MESSAGES_LOADING_STATUS,
  payload: LoadingState
}

// Action creators
export const setMessagesData = (payload: IMessage[]): ISetMessagesData => ({
  type: MessagesActionTypes.SET_MESSAGES_DATA,
  payload
});
export const fetchMessagesData = (): IFetchMessagesData => ({
  type: MessagesActionTypes.FETCH_MESSAGES
})
export const setMessagesLoadingStatus = (payload: LoadingState): ISetMessagesLoadingStatus => ({
  type: MessagesActionTypes.SET_MESSAGES_LOADING_STATUS,
  payload
})

export type MessagesAction = ISetMessagesData | IFetchMessagesData | ISetMessagesLoadingStatus;