import { Action } from 'redux';
import { LoadingState } from '../../../interfaces/loadingState';
import { IUser } from '../../../interfaces/user';

export enum UserActionTypes {
  SET_USER = 'user/SET_USER',
  SER_PARTNER = 'user/SER_PARTNER',
  USER_EXIT = 'user/USER_EXIT',
  SET_USER_LOADING_STATE = 'user/SET_USER_LOADING_STATE',
  GET_ME = 'user/GET_ME'
}

// Interfaces
export interface ISetUser extends Action<UserActionTypes> {
  type: UserActionTypes.SET_USER,
  payload: IUser | undefined
}
export interface ISetPartner extends Action<UserActionTypes> {
  type: UserActionTypes.SER_PARTNER,
  payload: IUser | undefined
}
export interface ISetUserToInitial extends Action<UserActionTypes> {
  type: UserActionTypes.USER_EXIT
}
export interface ISetUserLoadingState extends Action<UserActionTypes> {
  type: UserActionTypes.SET_USER_LOADING_STATE,
  payload: LoadingState
}
export interface IUserGetMe extends Action<UserActionTypes> {
  type: UserActionTypes.GET_ME
}

// Actions
export const setUser = (payload: IUser | undefined): ISetUser => ({
  type: UserActionTypes.SET_USER,
  payload
});
export const setPartner = (payload: IUser | undefined): ISetPartner => ({
  type: UserActionTypes.SER_PARTNER,
  payload
});
export const setUserToInitial = (): ISetUserToInitial => ({
  type: UserActionTypes.USER_EXIT
});
export const setUserLoadingState = (payload: LoadingState): ISetUserLoadingState => ({
  type: UserActionTypes.SET_USER_LOADING_STATE,
  payload
});
export const getUserMe = (): IUserGetMe => ({
  type: UserActionTypes.GET_ME
})

export type UserAction = ISetUser | ISetPartner | ISetUserToInitial | ISetUserLoadingState | IUserGetMe;