import axios from 'axios';
import { IUser } from '../interfaces/user';
import { ISetUser } from '../store/ducks/user/actionCreators';

interface IResponce {
  status: string,
  data: IUser
}
export const userApi = {
  async register(payload: ISetUser['payload']): Promise<IResponce> {
    const {data} = await axios.post('/user/register', payload);
    return data;
  }
}