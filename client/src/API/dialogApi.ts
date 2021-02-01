import { axios } from '../core/axios';
import { IUser } from '../interfaces';
import { IDialog } from '../interfaces/dialog';

export interface AllDialogsResponse {
  status: 'error' | 'success',
  data: IDialog[]
}

export const dialogsApi = {
  async fetchAllDialogs(payload: IUser['_id']): Promise<AllDialogsResponse> {
    try {
      const {data} = await axios.get<AllDialogsResponse>(`/dialogs/${payload}`);
      return data;
    } catch (error) {
      return {
        status: 'error',
        data: []
      }
    }
  }
};