import { IDialog } from '../../../interfaces/dialog';
import { LoadingState } from '../../../interfaces/loadingState';
import { RootStore } from '../../rootStore';

export const selectDialogsState = (store: RootStore): RootStore['dialogs'] => store.dialogs;

export const selectDialogsData = (store: RootStore): IDialog[] | undefined => selectDialogsState(store).data;

export const selectDialogsLoadingState = (store: RootStore): LoadingState => selectDialogsState(store).loadingState;

export const selectDialogsStatusIsLoading = (store: RootStore): boolean => selectDialogsState(store).loadingState === LoadingState.LOADING;
export const selectDialogsStatusIsLoaded = (store: RootStore): boolean => selectDialogsState(store).loadingState === LoadingState.LOADED;
export const selectDialogsStatusIsError = (store: RootStore): boolean => selectDialogsState(store).loadingState === LoadingState.ERROR;