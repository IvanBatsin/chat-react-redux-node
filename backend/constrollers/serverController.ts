import { IController } from "../interface/controller";
import express, { Application } from "express";
import { passport } from '../core/passport';
import { errorHandler } from '../middleware/errorHandler';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from "socket.io";
const cors = require('cors');

export class App {
  private app: Application;
  private port: number;
  private server: http.Server;
  public io: Server

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
  }

  private intializeMiddleware(){
    this.app.use(express.json({}));
    this.app.use(cors());
    this.app.options('*', cors());
    this.app.use(passport.initialize());
    this.app.use(errorHandler);
  }

  public intializeControllers(controllers: IController[]): void {
    controllers.forEach(controller => this.app.use('/', controller.router));
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