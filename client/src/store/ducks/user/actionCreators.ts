import { Action } from 'redux';
import { IUser } from '../../../interfaces/user';

export enum UserActionTypes {
  SET_USER = 'user/SET_USER',
  SER_PARTNER = 'user/SER_PARTNER'
}

export interface ISetUser extends Action<UserActionTypes> {
  type: UserActionTypes.SET_USER,
  payload: IUser | undefined
}
export interface ISetPartner extends Action<UserActionTypes> {
  type: UserActionTypes.SER_PARTNER,
  payload: IUser | undefined
}

export const setUser = (payload: IUser | undefined): ISetUser => ({
  type: UserActionTypes.SET_USER,
  payload
});
export const setPartner = (payload: IUser | undefined): ISetPartner => ({
  type: UserActionTypes.SER_PARTNER,
  payload
});

export type UserAction = ISetUser | ISetPartner;