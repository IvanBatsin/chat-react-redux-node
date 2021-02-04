import { axios } from '../core/axios';
import { ISignInPayload, ISignUpPayload } from '../interfaces/forms';
import { ServerStatus } from '../interfaces/types';
import { IUser } from '../interfaces/user';

export interface ServerUserResponse<T> {
  status: ServerStatus,
  data: T
}

export interface ISignInUser {
  status: ServerStatus,
  data: IUser,
  token: string
}

export const userApi = {
  async signUp(payload: ISignUpPayload): Promise<ServerUserResponse<IUser>> {
    const {data} = await axios.post<ServerUserResponse<IUser>>('/user/signup', payload);
    return data;
  },

  async signIn(payload: ISignInPayload): Promise<ISignInUser> {
    const {data} = await axios.post<ISignInUser>('/user/signin', payload);
    return data;
  },

  async getMe(): Promise<ServerUserResponse<IUser>> {
    const {data} = await axios.get<ServerUserResponse<IUser>>('/user/me');
    return data;
  }
}