import { LoadingState } from '../../../interfaces/loadingState';
import { IMessage } from '../../../interfaces/message';

export interface MessagesState {
  data: IMessage[] | undefined,
  loadingState: LoadingState
}