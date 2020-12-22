import { RootStore } from '../../rootStore';
import { IUser } from '../../../interfaces/user';

export const selectUser = (store: RootStore): RootStore['user'] => store.user;
export const selectUserObject = (store: RootStore): IUser | undefined => selectUser(store).user;