import { Request, Response} from 'express';
import { DialogModel } from '../models/Dialog';

class DialogController {
  static async index(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.params.id;
      const dialogs = await DialogModel.find({$or: [{author: userId}, {partner: userId}]}).exec();

      res.json({
        status: 'success',
        data: dialogs
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
        message: error
      });
    }
  }
}

export { DialogController };