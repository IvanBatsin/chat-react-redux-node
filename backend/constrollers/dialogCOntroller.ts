import { Request, Response, NextFunction, Router } from 'express';
import { DialogModel } from '../models/Dialog';
import { MessageModel } from '../models/Message';
import { passport } from '../core/passport';
import { updateLastSeen } from '../middleware/last_seen';
import { IController } from '../interface/controller';
import { HttpExeption } from '../interface/httpExeption';
import { Socket } from 'socket.io';
import { checkIdType } from '../utils/checkIdType';
import { SocketActions } from '../interface/socketActions'; 

export class DialogController implements IController {
  public path: string = '/dialogs';
  public router: Router = Router();
  public socket!: Socket;

  constructor(socket: Socket){
    this.initializeRouter();
    this.socket = socket;
  }

  public initializeRouter(): void {
    this.router.get(`${this.path}/:author`, passport.authenticate('jwt', {session: false}), updateLastSeen, this.index);
    this.router.post(`${this.path}/create`, passport.authenticate('jwt', {session: false}), updateLastSeen, this.create);
  }

  private index = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
    try {
      const author: string = req.params.author;

      if (!author || !checkIdType(author)) {
        return next(new HttpExeption(404, 'Не верный запрос'));
      }

      const dialogs = await DialogModel.find({$or: [{author}, {partner: author}]}).populate(['author', 'partner', 'lastMessage']).exec();

      res.json({
        status: 'success',
        data: dialogs
      });
    } catch (error) {
      console.log(error);
      next(new HttpExeption(500, ""));
    }
  }

  private create = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
    try {
      const {author, partner, text} = req.body;

      if (!checkIdType(author, partner)) {
        return next(new HttpExeption(404, 'Не верный запрос'));
      }

      const condidate = await DialogModel.findOne({$or: [
        {author: author, partner: partner}, 
        {author: partner, partner: author}
      ]});

      let dialog;
      if (condidate) {
        dialog = condidate;
      } else {
        dialog = await new DialogModel({author, partner});
        await dialog.save();
      }

      // Create new Message
      const message = await new MessageModel({
        text, author, dialog: dialog._id
      });
      await message.save();

      // Edit last message in dialog
      dialog.lastMessage = message._id;
      await dialog.save();

      // Emit dialog create socket event
      // this.socket.emit(SocketActions.DIALOG_CREATED, {dialogId: dialog._id});
      // this.socket.emit(SocketActions.DIALOG_CREATED);
      this.socket.emit('server');

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