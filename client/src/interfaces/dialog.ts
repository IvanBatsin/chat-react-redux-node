import { IAttachments, IUser } from ".";

export interface IDialog {
  _id: string,
  createdAt: string,
  text: string,
  attachments: IAttachments[],
  isReaded: boolean
  user: IUser,
}