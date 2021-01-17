import axios from 'axios';
import { IUser } from '../interfaces/user';
import { ISetUser } from '../store/ducks/user/actionCreators'

export interface IAuthPayload {
  email: string,
  password: string
}

export interface IRegisterUser {
  status: 'success' | 'error',
  data: IUser | string
}
export interface IAuthUser {
  status: 'success' | 'error',
  data: IUser | string,
  token?: string
}

export const userApi = {
  async register(payload: ISetUser['payload']): Promise<IRegisterUser> {
    try {
      const {data} = await axios.post<IRegisterUser>('/user/signup', payload);
      return data;
    } catch (error) {
      return error.response.data;
    }
  },

  async auth(payload: IAuthPayload): Promise<IAuthUser> {
    try {
      const {data} = await axios.post<IAuthUser>('/user/signin', payload);
      return data;
    } catch (error) {
      if (typeof error.response.data === 'string') {
        return {
          status: 'error',
          data: error.response.data
        }
      }
      return error.response.data;
    }
  }
}