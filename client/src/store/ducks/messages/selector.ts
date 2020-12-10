import { IMessage } from '../../../interfaces';
import { LoadingState } from '../../../interfaces/loadingState';
import { RootStore } from '../../rootStore';

const selectMessages = (store: RootStore): RootStore['messages'] => store.messages;

const selectMessagesLoadingStatus = (store: RootStore): LoadingState => selectMessages(store).status;

const selectMessagesData = (store: RootStore): IMessage[] => selectMessages(store).data; 