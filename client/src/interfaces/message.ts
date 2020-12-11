import { IUser } from "./";
import { IAttachments } from './attachments';
import { IDialog } from './dialog';

export interface IMessage {
  _id: string,
  dialog: IDialog['_id'],
  user: IUser,
  text: string,
  isReaded: boolean,
  createdAt: string,
  attachments: IAttachments[],
  audio?: string
}