import produce, {Draft} from 'immer';
import { LoadingState } from '../../../interfaces/loadingState';

export enum MessagesActionTypes {
  SET_MESSAGES_DATA = 'messages/SET_MESSAGES_DATA',
  SET_MESSAGES_LOADING_STATUS = 'messages/SET_MESSAGES_LOADING_STATUS',
  FETCH_MESSAGES = 'messages/FETCH_MESSAGES'
}