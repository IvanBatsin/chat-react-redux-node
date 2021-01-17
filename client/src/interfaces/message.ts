import { IUser } from "./";
import { IAttachments } from './attachments';
import { IDialog } from './dialog';

export interface IMessage {
  _id: string,
  // dialog: IDialog['_id'],
  // author: IUser['_id'],
  dialog: string,
  author: string,
  text: string,
  unread: boolean,
  createdAt: string,
  updatedAt: string,
  attachments?: IAttachments[],
  audio?: string
}