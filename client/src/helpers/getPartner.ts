import { IUser } from "../interfaces";

export const getPartner = (currentUser: IUser, author: IUser, partner: IUser): IUser => {
  if (currentUser._id === author._id){
    return partner;
  }
  return author;
}