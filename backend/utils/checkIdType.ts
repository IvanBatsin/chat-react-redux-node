import { Types } from 'mongoose';

export const checkIdType = (...args: string[]): boolean => {
  const length = args.length;
  if (length === 1) {
    return Types.ObjectId.isValid(args[0]);
  } else {
    for(let i=0; i<=length-1; i++){
      if (!Types.ObjectId.isValid(args[i])) {
        return false;
      }
    }
  }
  return true;
}