import { IDialog } from '../../../interfaces/dialog';
import { LoadingState } from '../../../interfaces/loadingState';

export interface DialogsState {
  data: IDialog[] | undefined,
  loadingState: LoadingState
}