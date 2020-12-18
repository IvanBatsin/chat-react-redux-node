import { Request, Response, NextFunction, Router } from 'express';
import { DialogModel } from '../models/Dialog';
import { MessageModel } from '../models/Message';
import { passport } from '../core/passport';
import { updateLastSeen } from '../middleware/last_seen';
import { IController } from '../interface/controller';
import { HttpExeption } from '../interface/httpExeption';
import { Server } from 'socket.io';

export class DialogController implements IController {
  public path: string = '/dialogs';
  public router: Router = Router();
  public io: Server;

  constructor(socket: Server){
    this.io = socket;
    this.initializeRouter();
  }

  public initializeRouter(): void {
    this.router.get(`${this.path}/:author`, passport.authenticate('jwt', {session: false}), updateLastSeen, this.index.bind(this));
    this.router.post(`${this.path}/create`, passport.authenticate('jwt', {session: false}), updateLastSeen, this.create.bind(this));
  }

  async index(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const author: string = req.params.author;

      if (!author) return next(new HttpExeption(404, 'Не верный запрос'));

      const dialogs = await DialogModel.find({$or: [{author}, {partner: author}]}).populate(['author', 'partner']).exec();

      res.json({
        status: 'success',
        data: dialogs
      });
    } catch (error) {
      console.log(error);
      next(new HttpExeption(500, ""));
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const {author, partner, text} = req.body;
      if (!author || !partner)  return next(new HttpExeption(404, 'Не верный запрос'));

      const dialog = await new DialogModel({author, partner});

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
      next(new HttpExeption(500, ""));
    }
  }
}