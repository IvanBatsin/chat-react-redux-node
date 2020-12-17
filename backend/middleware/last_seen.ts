import { Request, Response, NextFunction } from 'express';
import { UserModel, IUser } from '../models/User';

export const updateLastSeen = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
  try {
    if (req.user) {
      const tokenUser = req.user as IUser;
      await UserModel.findOneAndUpdate({_id: tokenUser._id}, {$set: {last_seen: new Date()}});
      return next();
    }
    
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}