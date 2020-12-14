import { Request, Response, NextFunction } from 'express';
import { UserModel, IUser } from '../models/User';

export const updateLastSeen = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.user) {
      console.log('update');
      const tokenUser = req.user as IUser;
      const user = await UserModel.findOneAndUpdate({id: tokenUser._id}, {$set: {last_seen: new Date()}});
      
      next();
    }
    console.log('just next');
    next();
  } catch (error) {
    res.status(403).send();
  }
}