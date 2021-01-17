import { Types } from 'mongoose';

export const checkIdType = (...args: string[]): boolean => {
  const length = args.length;
  for(let i=0; i<=length-1; i++){
    if (!Types.ObjectId.isValid(args[i])) {
      return false;
    }
  }
  return true;
}