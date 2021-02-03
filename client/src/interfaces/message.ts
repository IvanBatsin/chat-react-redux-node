import { IUser } from "./";
import { IAttachments } from './attachments';
import { IDialog } from './dialog';

export interface IMessage {
  _id: string,
  dialog: string,
  author: IUser,
  text: string,
  unread: boolean,
  createdAt: string,
  updatedAt: string,
  attachments?: IAttachments[],
  audio?: string
}