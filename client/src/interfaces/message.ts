import { IUser } from "./";
import { IAttachments } from './attachments';

export interface IMessage {
  _id: string,
  user: IUser,
  text: string,
  isReaded: boolean,
  createdAt: string,
  attachments: IAttachments[],
  audio?: string
}