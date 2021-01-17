import { IAttachments, IUser } from ".";
import { IMessage } from "./message";

export interface IDialog {
  _id: string,
  createdAt: string,
  updatedAt: string,
  author: IUser,
  partner: IUser,
  lastMessage: IMessage
}