import { Request, Response} from 'express';
import { DialogModel } from '../models/Dialog';
import { MessageModel } from '../models/Message';

class DialogController {
  static async index(req: Request, res: Response): Promise<void> {
    try {
      const author: string = req.params.author;
      const dialogs = await DialogModel.find({$or: [{author}, {partner: author}]}).populate(['author', 'partner']).exec();

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

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const {author, partner, text} = req.body;

      if (!author || !partner) {
        res.status(404).send();
        return;
      }

      const dialog = new DialogModel({
        author, partner
      });

      await dialog.save();

      const message = await new MessageModel({
        text, author, dialog: dialog._id
      });

      await message.save();

      res.status(201).json({
        status: 'success',
        data: {dialog, message}
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
        data: error
      });
    }
  }
}

export { DialogController };