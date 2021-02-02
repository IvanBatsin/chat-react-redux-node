import { axios } from '../core/axios';
import { IRegisterForm } from '../interfaces/registerForm';
import { IUser } from '../interfaces/user';

type ServerStatus = 'success' | 'error';

export interface IAuthPayload {
  email: string,
  password: string
}

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
  async register(payload: IRegisterForm): Promise<ServerResponse<IUser>> {
    const {data} = await axios.post<ServerResponse<IUser>>('http://localhost:5000/user/signup', payload);
    return data;
  },

  async login(payload: IAuthPayload): Promise<ILoginUser> {
    const {data} = await axios.post<ILoginUser>('http://localhost:5000/user/signin', payload);
    return data;
  },

  async getMe(): Promise<ServerResponse<IUser>> {
    const { data } = await axios.get<ServerResponse<IUser>>('http://localhost:5000/user/me');
    return data;
  }
}