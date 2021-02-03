import axios from 'axios';
import { IMessage } from '../interfaces';

export interface ServerMessageResponse<Data> {
  status: 'error' | 'success',
  data: Data
}

export const messagesApi = {
  async fetchMessages(dialog: string): Promise<ServerMessageResponse<IMessage[]>>{
    const {data} = await axios.get<ServerMessageResponse<IMessage[]>>(`/messages?dialog=${dialog}`);
    return data;
  }
}