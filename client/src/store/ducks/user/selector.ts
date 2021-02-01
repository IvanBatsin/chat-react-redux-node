import { RootStore } from '../../rootStore';
import { IUser } from '../../../interfaces/user';
import { LoadingState } from '../../../interfaces/loadingState';

export const selectUserState = (store: RootStore): RootStore['user'] => store.user;
export const selectUserStateData = (store: RootStore): IUser | undefined => selectUserState(store).user;
export const selectUserPartner = (store: RootStore): IUser | undefined => selectUserState(store).partner;
export const selectUserLoadingState = (store: RootStore): LoadingState => selectUserState(store).loadingState;