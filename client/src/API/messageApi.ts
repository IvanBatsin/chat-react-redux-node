import axios from 'axios';
import { IMessage } from '../interfaces';

export interface MessagesResponse {
  status: 'error' | 'success',
  data: IMessage[]
}

export const messagesApi = {
  async fetchMessages(dialog: string): Promise<MessagesResponse>{
    try {
      const {data} = await axios.get<MessagesResponse>(`/messages?dialog=${dialog}`);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
}