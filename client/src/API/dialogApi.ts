import { axios } from '../core/axios';
import { IUser } from '../interfaces';
import { IDialog } from '../interfaces/dialog';

export interface ServerDialogResponse<Data> {
  status: 'error' | 'success',
  data: Data
}

export const dialogsApi = {
  async fetchAllDialogs(payload: IUser['_id']): Promise<ServerDialogResponse<IDialog[]>> {
    const {data} = await axios.get<ServerDialogResponse<IDialog[]>>(`/dialogs/${payload}`);
    return data;
  }
};