import express, { Application } from "express";
import { IController, IControllerContructor } from "../interface/controller";
import { passport } from '../core/passport';
import { errorHandler } from '../middleware/errorHandler';
import http from 'http';
import mongoose from 'mongoose';
import { Socket, Server } from "socket.io";
const cors = require('cors');
import { UserController } from './userContoroller';
import { DialogController } from './dialogController';
import { MessageComtroller } from './messageController';

export class App {
  private app: Application;
  private port: number;
  private server: http.Server;
  public io: Server
  private controllers: IControllerContructor[] = [UserController, DialogController, MessageComtroller];

  constructor(port: number){
    this.port = port;
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: "*"
      }
    });

    this.intializeMiddleware();
    this.intializeControllers();
  }

  private intializeMiddleware(){
    this.app.use(express.json({}));
    this.app.use(cors());
    this.app.options('*', cors());
    this.app.use(passport.initialize());
    this.app.use(errorHandler);
  }

  private createRouteController(ctr: IControllerContructor, io: Server): IController{
    return new ctr(io);
  }

  private intializeControllers(): void {
    this.controllers.forEach(item => {
      const controller: IController = this.createRouteController(item, this.io);
      this.app.use('/', controller.router);
    });
  }

  private async connectDB(): Promise<void> {
    try {
      mongoose.set('debug', true);
      mongoose.connection
        .on('open', () => console.log('Connection is open'))
        .on('close', () => console.log('Connection is close'))
        .on('error', (error) => console.log(error));

      await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_chat', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      });
    } catch (error) {
      console.log(error);
    }
  }

  private listen(): void {
    this.server.listen(this.port, () => console.log('we on air'));
    this.socketEventsHandler();
  }

  private socketEventsHandler(): void {
    this.io.on('connection', (socket: Socket)=> {
      socket.emit('test', 'Hello sucker');
    });
  }

  public async startApp(): Promise<void>{
    try {
      await this.connectDB();
      this.listen();
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  } 
}