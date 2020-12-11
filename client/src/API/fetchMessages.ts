import axios from 'axios';
import { IMessage } from '../interfaces';

export const messagesApi = {
  async fetchMessages(dialog: string): Promise<IMessage[]>{
    const {data} = await axios.get(`/messages?dialog=${dialog}`);
    return data;
  }
}