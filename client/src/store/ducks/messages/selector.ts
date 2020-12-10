import { IMessage } from '../../../interfaces';
import { LoadingState } from '../../../interfaces/loadingState';
import { RootStore } from '../../rootStore';

export const selectMessages = (store: RootStore): RootStore['messages'] => store.messages;

export const selectMessagesLoadingStatus = (store: RootStore): LoadingState => selectMessages(store).status;

export const selectMessagesData = (store: RootStore): IMessage[] | undefined => selectMessages(store).data; 

export const selectIsLoaded = (store: RootStore): boolean => selectMessages(store).status === LoadingState.LOADED;
export const selectIsLoading = (store: RootStore): boolean => selectMessages(store).status === LoadingState.LOADING;
export const selectIsError = (store: RootStore): boolean => selectMessages(store).status === LoadingState.ERROR;