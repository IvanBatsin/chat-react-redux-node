import { IMessage } from '../../../interfaces';
import { LoadingState } from '../../../interfaces/loadingState';
import { RootStore } from '../../rootStore';

export const selectMessagesState = (store: RootStore): RootStore['messages'] => store.messages;

export const selectMessagesLoadingState = (store: RootStore): LoadingState => selectMessagesState(store).loadingState;

export const selectMessagesData = (store: RootStore): IMessage[] | undefined => selectMessagesState(store).data; 

export const selectMessagesStatusIsLoaded = (store: RootStore): boolean => selectMessagesState(store).loadingState === LoadingState.LOADED;
export const selectMessagesStatusIsLoading = (store: RootStore): boolean => selectMessagesState(store).loadingState === LoadingState.LOADING;
export const selectMessagesStatusIsError = (store: RootStore): boolean => selectMessagesState(store).loadingState === LoadingState.ERROR;