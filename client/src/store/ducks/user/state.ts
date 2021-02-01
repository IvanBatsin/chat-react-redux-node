import { IUser } from "../../../interfaces";
import { LoadingState } from "../../../interfaces/loadingState";

export interface UserState {
  user: IUser | undefined,
  partner: IUser | undefined,
  loadingState: LoadingState 
}