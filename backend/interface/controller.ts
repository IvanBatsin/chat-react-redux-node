import { Router } from 'express';
import { Server } from 'socket.io';

export interface IController {
  path: string,
  router: Router,
  io: Server
}

export interface IControllerContructor {
  new (io: Server): IController
}