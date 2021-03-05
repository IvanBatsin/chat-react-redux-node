import { Action } from 'redux';
import { ISignInPayload, ISignUpPayload } from '../../../interfaces/forms';
import { LoadingState } from '../../../interfaces/loadingState';
import { IUser } from '../../../interfaces/user';

export enum UserActionTypes {
  SET_USER = 'user/SET_USER',
  SET_PARTNER = 'user/SET_PARTNER',
  USER_EXIT = 'user/USER_EXIT',
  SET_USER_LOADING_STATE = 'user/SET_USER_LOADING_STATE',
  GET_ME = 'user/GET_ME',
  USER_SIGNIN = 'user/USER_SIGNIN',
  USER_SIGNUP = 'user/USER_SIGN_UP'
}

// Interfaces
export interface ISetUserData extends Action<UserActionTypes> {
  type: UserActionTypes.SET_USER,
  payload: IUser | undefined
}
export interface ISetPartner extends Action<UserActionTypes> {
  type: UserActionTypes.SET_PARTNER,
  payload: IUser | undefined
}
export interface IUserExit extends Action<UserActionTypes> {
  type: UserActionTypes.USER_EXIT
}
export interface ISetUserLoadingState extends Action<UserActionTypes> {
  type: UserActionTypes.SET_USER_LOADING_STATE,
  payload: LoadingState
}
export interface IUserGetMe extends Action<UserActionTypes> {
  type: UserActionTypes.GET_ME
}
export interface IUserSignIn extends Action<UserActionTypes> {
  type: UserActionTypes.USER_SIGNIN,
  payload: ISignInPayload
}
export interface IUserSignUp extends Action<UserActionTypes> {
  type: UserActionTypes.USER_SIGNUP,
  payload: ISignUpPayload
}


// Actions
export const setUserData = (payload: IUser | undefined): ISetUserData => ({
  type: UserActionTypes.SET_USER,
  payload
});
export const setPartner = (payload: IUser | undefined): ISetPartner => ({
  type: UserActionTypes.SET_PARTNER,
  payload
});
export const setUserExit = (): IUserExit => ({
  type: UserActionTypes.USER_EXIT
});
export const setUserLoadingState = (payload: LoadingState): ISetUserLoadingState => ({
  type: UserActionTypes.SET_USER_LOADING_STATE,
  payload
});
export const getUserMe = (): IUserGetMe => ({
  type: UserActionTypes.GET_ME
});
export const userSignIn = (payload: ISignInPayload): IUserSignIn => ({
  type: UserActionTypes.USER_SIGNIN,
  payload
});
export const userSignUp = (payload: ISignUpPayload): IUserSignUp => ({
  type: UserActionTypes.USER_SIGNUP,
  payload
});

export type UserAction = ISetUserData | ISetPartner | IUserExit | ISetUserLoadingState | IUserGetMe | IUserSignIn | IUserSignUp;