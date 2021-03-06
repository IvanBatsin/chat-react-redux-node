import { axios } from '../core/axios';
import { ISignInPayload, ISignUpPayload, ServerResponse, UserSignIn } from '../interfaces/forms';
import { IUser } from '../interfaces/user';

export const userApi = {
  async signUp(payload: ISignUpPayload): Promise<ServerResponse<IUser>> {
    const {data} = await axios.post<ServerResponse<IUser>>('/users/signup', payload);
    return data;
  },

  async signIn(payload: ISignInPayload): Promise<ServerResponse<UserSignIn>> {
    const {data} = await axios.post<ServerResponse<UserSignIn>>('http://localhost:5000/users/signin', payload);
    return data;
  },

  async getMe(): Promise<ServerResponse<IUser>> {
    const {data} = await axios.get<ServerResponse<IUser>>('/users/me');
    return data;
  }
}