import { axios } from '../core/axios';
import { IUser } from '../interfaces';
import { IDialog } from '../interfaces/dialog';
import { ServerResponse } from '../interfaces/forms';

export const dialogsApi = {
  async fetchAllDialogs(payload: IUser['_id']): Promise<ServerResponse<IDialog[]>> {
    const {data} = await axios.get<ServerResponse<IDialog[]>>(`/dialogs/${payload}`);
    return data;
  }
};