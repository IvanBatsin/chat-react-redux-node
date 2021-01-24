import { Request, Response, NextFunction } from 'express';
import { MessageModel } from '../models/Message';
import { DialogModel } from '../models/Dialog';
import { HttpExeption } from '../interface/httpExeption';
import { IController } from '../interface/controller';
import { Router } from 'express';
import { passport } from '../core/passport';
import { updateLastSeen } from '../middleware/last_seen';
import { Socket, Server } from 'socket.io';
import { checkIdType } from '../utils/checkIdType';

export class MessageComtroller implements IController {
  public path: string = '/messages';
  public router: Router = Router();
  public socket!: Socket;
  public io!: Server;

  // constructor(socket: Socket){
  //   this.socket = socket;
  //   this.initializeRouter();
  // }

  constructor(io: Server){
    this.initializeRouter();
    this.io = io;

    this.io.on('connection', (socket: Socket) => {
      this.socket = socket;
    })
  }

  public initializeRouter(): void {
    this.router.get(this.path, passport.authenticate('jwt', {session: false}), updateLastSeen, this.index);
    this.router.post(`${this.path}/create`, passport.authenticate('jwt', {session: false}), updateLastSeen, this.create);
  }

  private index = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
    try {
      const dialog = req.query.dialog;

      if (!dialog || !checkIdType(dialog.toString())) {
        return next(new HttpExeption(404, "Неверный запрос"))
      };

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

  private create = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> =>{
    try {
      const {text, author, partner, dialog} = req.body;

      if (!checkIdType(author, partner, dialog)) {
        return next(new HttpExeption(404, "Не верный запрос"));
      }

      // Create new message
      const message = new MessageModel({text, author, partner, dialog});
      await message.save();

      await DialogModel.findByIdAndUpdate(dialog, {$set: {lastMessage: message._id}});

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