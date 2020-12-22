import { Action } from 'redux';
import { IUser } from '../../../interfaces/user';

export enum UserActionTypes {
  SET_USER = 'user/SET_USER'
}

export interface ISetUser extends Action<UserActionTypes> {
  type: UserActionTypes.SET_USER,
  payload: IUser
}

export const setUser = (payload: IUser): ISetUser => ({
  type: UserActionTypes.SET_USER,
  payload
});

export type UserAction = ISetUser;