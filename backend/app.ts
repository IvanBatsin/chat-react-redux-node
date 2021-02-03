import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.join(__dirname, '.env')});

import { App } from './constrollers/serverController';
import { DialogController } from './constrollers/dialogController';
import { MessageComtroller } from './constrollers/messageController';
import { UserController } from './constrollers/userContoroller';
import { Socket } from 'socket.io';

const app = new App(Number(process.env.PORT) || 5000);
app.intializeControllers([
  new DialogController(app.io),
  new MessageComtroller(app.io),
  new UserController(app.io)
]);

app.startApp();