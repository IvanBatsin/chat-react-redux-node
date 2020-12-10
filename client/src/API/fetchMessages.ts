import axios from 'axios';
import { IMessage } from '../interfaces';

export const messagesApi = {
  async fetchMessages(): Promise<IMessage[]>{
    const {data} = await axios.get('/messages');
    return data;
  }
}