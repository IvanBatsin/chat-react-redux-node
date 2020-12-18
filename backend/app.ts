import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.join(__dirname, '.env')});

import { App } from './constrollers/serverController';

const server = new App(Number(process.env.PORT) || 5000);

server.startApp();