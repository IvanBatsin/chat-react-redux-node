import { HttpExeption } from '../interface/httpExeption';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (error: HttpExeption, req: Request, res: Response, next: NextFunction): void => {
  const status: number = error.status || 500;
  const message: string = error.message || "Server Error";

  res.status(status).json({
    status: 'error',
    data: message
  });
}