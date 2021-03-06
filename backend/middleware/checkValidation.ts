import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { HttpExeption } from '../interface/httpExeption';

export const checkValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpExeption(401, errors.array()[0].msg));
  } else {
    next();
  }
}