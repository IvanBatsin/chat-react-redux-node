import { axios } from '../core/axios';
import { ServerStatus } from '../interfaces/types';
import { IUser } from '../interfaces/user';
import { ISignInPayload } from '../modules/signIn/SignIn';
import { ISignUpForm } from '../modules/signUp/components/SignUpForm';

export interface ServerResponse<T> {
  status: ServerStatus,
  data: T
}

export interface ILoginUser {
  status: ServerStatus,
  data: IUser | string,
  token?: string
}

export const userApi = {
  async signUp(payload: ISignUpForm): Promise<ServerResponse<IUser>> {
    const {data} = await axios.post<ServerResponse<IUser>>('user/signup', payload);
    return data;
  },

  async signIn(payload: ISignInPayload): Promise<ILoginUser> {
    const {data} = await axios.post<ILoginUser>('user/signin', payload);
    return data;
  },

  async getMe(): Promise<ServerResponse<IUser>> {
    const {data} = await axios.get<ServerResponse<IUser>>('/user/me');
    return data;
  }
}