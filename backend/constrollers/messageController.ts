import { Request, Response, NextFunction } from 'express';
import { MessageModel } from '../models/Message';
import { HttpExeption } from '../interface/httpExeption';
import { IController } from '../interface/controller';
import { Router } from 'express';
import { passport } from '../core/passport';
import { updateLastSeen } from '../middleware/last_seen';

export class MessageComtroller implements IController {
  public path: string = '/messages';
  public router: Router = Router();

  constructor(){
    this.initializeRouter();
  }

  public initializeRouter(): void {
    this.router.get(this.path, passport.authenticate('jwt', {session: false}), updateLastSeen, this.index.bind(this));
    this.router.post(`${this.path}/create`, passport.authenticate('jwt', {session: false}), updateLastSeen, this.create.bind(this));
  }

  async index(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const dialog = req.query.dialog;

      if (!dialog) return next(new HttpExeption(404, "Неверный запрос"));

      const messages = await MessageModel.find({dialog}).populate('dialog').exec();

      res.json({
        status: 'success',
        data: messages
      });
    } catch (error) {
      console.log(error);
      next(new HttpExeption(500, ""));
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const {text, author, partner, dialog} = req.body;

      if (!author || !partner || !dialog)  return next(new HttpExeption(404, "Не верный запрос"));

      const message = new MessageModel({text, author, partner, dialog});

      await message.save();

      res.status(201).json({
        status: 'success',
        data: message
      });
    } catch (error) {
      console.log(error);
      next(new HttpExeption(500, ""));
    }
  }
}