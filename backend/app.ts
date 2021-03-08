import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.join(__dirname, './.env')});
import express, { Application } from 'express';
import http from 'http';
import { Socket, Server } from 'socket.io';
import { passport } from './core/passport';
import { userRouter } from './routes/userRouter';
import mongoose from 'mongoose';
import { errorHandler } from './middleware/errorHandler';
import { dialogRouter } from './routes/dialogRouter';
import { messageRouter } from './routes/messageRouter';
const morgan = require('morgan');
const cors = require('cors');

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

app.use('/users', userRouter);
app.use('/dialogs', dialogRouter);
app.use('/messages', messageRouter);

app.use(errorHandler);

const startApp = async (): Promise<void> => {
  try {
    mongoose.set('debug', true);
    mongoose.connection
      .on('open', () => console.log('Connection is ready'))
      .on('close', () => console.log('Connection is close'))
      .on('error', (error) => console.log(error));

    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_chat', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    app.listen(Number(process.env.PORT) || 5000, () => console.log('we on air'));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

startApp();

// import { App } from './constrollers/serverController';
// import { DialogController } from './constrollers/dialogController';
// import { MessageComtroller } from './constrollers/messageController';
// import { UserController } from './constrollers/userContoroller';
// import { Socket } from 'socket.io';

// const app = new App(Number(process.env.PORT) || 5000);
// app.intializeControllers([
//   new DialogController(app.io),
//   new MessageComtroller(app.io),
//   new UserController(app.io)
// ]);

// app.startApp();