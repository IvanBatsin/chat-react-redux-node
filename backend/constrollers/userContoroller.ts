import { IController } from "../interface/controller";
import { updateLastSeen } from '../middleware/last_seen';
import { Router, Request, Response, NextFunction } from 'express';
import { HttpExeption } from '../interface/httpExeption';
import { registerValidation } from '../validations/userValidation';
import bcrypt from 'bcryptjs';
import { generateHash } from '../utils/generateHash';
import { sendMail } from '../utils/sendMails';
import { validationResult } from 'express-validator';
import { UserModel } from '../models/User';
import path from 'path';
import jwt from 'jsonwebtoken';
import passport from "passport";

export class UserController implements IController {
  public path: string = '/user';
  public router: Router = Router();

  constructor(){
    this.initializeRouter();
  }

  public initializeRouter(): void{
    this.router.post(`${this.path}/register`, registerValidation, this.create.bind(this));
    this.router.get(`${this.path}/verify`, this.verify.bind(this));
    this.router.post(`${this.path}/login`, passport.authenticate('local'), updateLastSeen, this.afterLogin);
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          status: 400,
          error: errors.array()
        });
        return;
      }

      const {email, password, fullName, userName} = req.body;
      const hashPassword = await bcrypt.hash(password, 12);

      const user = new UserModel({
        email, 
        fullName, 
        userName,
        password: hashPassword,
        confirm_hash: generateHash(process.env.HASH_STRING || Math.random().toString())
      });

      await user.save();

      await sendMail({
        from: 'chatAdmin@rest.com',
        html: `Пользователь ${user.userName}, пожалуйста подтвердите свой аккаунт, пройдите по ссылке - <a href="http://localhost:${Number(process.env.PORT || 5000)}/user/verify?hash=${user.confirm_hash}">Подтвердить</a>`,
        subject: "Подтверждение аккаунта",
        to: user.email
      });

      res.status(201).json({
        status: 'success',
        data: user
      });
    } catch (error) {
      console.log(error);
      next(new HttpExeption(500, ""));
    }
  }

  async verify(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const hash = req.query.hash;

      if (!hash) return next(new HttpExeption(404, 'Неверный запрос'));

      const user = await UserModel.findOneAndUpdate({confirm_hash: hash.toString()}, {$set: {confirmed: true}});

      if (!user) return next(new HttpExeption(401, 'Пользователь не найден'));

      res.sendFile(path.join(__dirname, '../public/index.html'));
    } catch (error) {
      console.log(error);
      next(new HttpExeption(500, ""));
    }
  }

  async afterLogin(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      if (req.user) {
        res.json({
          status: 'success',
          data: {
            ...req.user,
            password: undefined,
            confirm_hash: undefined,
            token: jwt.sign({data: req.user}, process.env.SECRET_KEY || 'secret key', {expiresIn: "30 d"})
          }
        });
      } else {
        res.status(403).send();
      }
    } catch (error) {
      console.log(error);
      next(new HttpExeption(500, ""));
    }
  }
}