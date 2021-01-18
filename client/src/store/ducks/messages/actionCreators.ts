import { LoadingState } from '../../../interfaces/loadingState';
import { Action } from 'redux';
import { IMessage } from '../../../interfaces/message';
import { IDialog } from '../../../interfaces/dialog';

export enum MessagesActionTypes {
  SET_MESSAGES_DATA = 'messages/SET_MESSAGES_DATA',
  SET_MESSAGES_LOADING_STATUS = 'messages/SET_MESSAGES_LOADING_STATUS',
  FETCH_MESSAGES = 'messages/FETCH_MESSAGES',
  SET_MESSAGES_TO_INITIAL = 'messages/SET_MESSAGES_TO_INITIAL'
}

// Interfaces
export interface ISetMessagesData extends Action<MessagesActionTypes> {
  type: MessagesActionTypes.SET_MESSAGES_DATA,
  payload: IMessage[] | undefined
}
export interface IFetchMessagesData extends Action<MessagesActionTypes> {
  type: MessagesActionTypes.FETCH_MESSAGES,
  payload: IDialog['_id']
}
export interface ISetMessagesLoadingStatus extends Action<MessagesActionTypes> {
  type: MessagesActionTypes.SET_MESSAGES_LOADING_STATUS,
  payload: LoadingState
}
export interface ISetMessagesToInitial extends Action<MessagesActionTypes> {
  type: MessagesActionTypes.SET_MESSAGES_TO_INITIAL,
}

// Action creators
export const setMessagesData = (payload: IMessage[] | undefined): ISetMessagesData => ({
  type: MessagesActionTypes.SET_MESSAGES_DATA,
  payload
});
export const fetchMessagesData = (payload: IDialog['_id']): IFetchMessagesData => ({
  type: MessagesActionTypes.FETCH_MESSAGES,
  payload
})
export const setMessagesLoadingStatus = (payload: LoadingState): ISetMessagesLoadingStatus => ({
  type: MessagesActionTypes.SET_MESSAGES_LOADING_STATUS,
  payload
})
export const setMessagesToInitial = (): ISetMessagesToInitial => ({
  type: MessagesActionTypes.SET_MESSAGES_TO_INITIAL
})

export type MessagesAction = ISetMessagesData | IFetchMessagesData | ISetMessagesLoadingStatus | ISetMessagesToInitial;