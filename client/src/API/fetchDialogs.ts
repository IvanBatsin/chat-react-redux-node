import axios from 'axios';
import { IDialog } from '../interfaces/dialog';

export const dialogsApi = {
  async fetchAllDialogs(): Promise<IDialog[]> {
    const {data} = await axios.get('/dialogs');
    return data;
  }
};