import { Request, Response } from 'express';
import { MessageModel } from '../models/Message';

class MessageController {
  static async index(req: Request, res: Response): Promise<void>{
    try {
      const dialog = req.query.dialog;

      if (!dialog) {
        res.status(404).send();
        return ;
      }

      const messages = await MessageModel.find({dialog}).populate('dialog').exec();

      res.json({
        status: 'success',
        data: messages
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
        error: error
      });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const {text, author, partner, dialog} = req.body;

      if (!author || !partner || !dialog) {
        res.status(404).send();
        return ;
      }

      const message = new MessageModel({text, author, partner, dialog});

      await message.save();

      res.status(201).json({
        status: 'success',
        data: message
      });
    } catch (error) {
      console.group(error);
      res.status(500).json({
        status: 'error',
        error: error
      });
    }
  }
}

export { MessageController }