import axios from 'axios';
import { IMessage } from '../interfaces';
import { ServerResponse } from '../interfaces/forms';

export const messagesApi = {
  async fetchMessages(dialog: string): Promise<ServerResponse<IMessage[]>>{
    const {data} = await axios.get<ServerResponse<IMessage[]>>(`/messages?dialog=${dialog}`);
    return data;
  }
}