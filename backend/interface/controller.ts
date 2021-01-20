import { Router } from 'express';
import { Server, Socket } from 'socket.io';

export interface IController {
  path: string,
  router: Router
}