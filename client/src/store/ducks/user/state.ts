import { IUser } from "../../../interfaces";

export interface UserState {
  user: IUser | undefined,
  partner: IUser | undefined
}