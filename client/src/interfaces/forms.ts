import { IUser } from ".";
import { ServerStatus } from "./types";

export interface ISignInPayload {
  email: string,
  password: string
}

export interface ISignUpPayload {
  userName: string,
  fullName: string,
  email: string,
  password: string,
  password2: string
}

export interface ServerResponse<Data> {
  status: ServerStatus,
  data: Data
}

export interface UserSignIn {
  user: IUser,
  token: string
}