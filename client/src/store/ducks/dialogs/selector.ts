import { IDialog } from '../../../interfaces/dialog';
import { LoadingState } from '../../../interfaces/loadingState';
import { RootStore } from '../../rootStore';

export const selectDialogs = (store: RootStore): RootStore['dialogs'] => store.dialogs;

export const selectDialogsData = (store: RootStore): IDialog[] | undefined => selectDialogs(store).data;

export const selectDialogsStatus = (store: RootStore): LoadingState => selectDialogs(store).status;

export const selectStatusIsLoadng = (store: RootStore): boolean => selectDialogs(store).status === LoadingState.LOADING;
export const selectStatusIsLoaded = (store: RootStore): boolean => selectDialogs(store).status === LoadingState.LOADED;
export const selectStatusIsError = (store: RootStore): boolean => selectDialogs(store).status === LoadingState.ERROR;