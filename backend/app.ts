import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.join(__dirname, '.env')});

import { App } from './constrollers/serverController';
import { UserController } from './constrollers/userContoroller';
import { MessageComtroller } from './constrollers/messageController';
import { DialogController } from './constrollers/dialogController';
const server = new App(
  [
    new UserController(),
    new MessageComtroller(),
    new DialogController()
  ], 
  Number(process.env.PORT) || 5000
);

server.startApp();