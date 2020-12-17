import express, { Application } from "express";
import { IController } from "../interface/controller";
import { passport } from '../core/passport';
import { errorHandler } from '../middleware/errorHandler';
import mongoose from 'mongoose';

export class App {
  private app: Application;
  private port: number;

  constructor(controllers: IController[], port: number){
    this.port = port;
    this.app = express();

    this.intializeMiddleware();
    this.intializeControllers(controllers);
  }

  private intializeMiddleware(){
    this.app.use(express.json({}));
    this.app.use(passport.initialize());
    this.app.use(errorHandler);
  }

  private intializeControllers(controllers: IController[]): void {
    controllers.forEach(item => {
      this.app.use('/', item.router);
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
    this.app.listen(this.port, () => console.log('we on air'));
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