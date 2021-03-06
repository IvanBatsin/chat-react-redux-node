import { IController } from "../interface/controller";
import { updateLastSeen } from '../middleware/last_seen';
import { Router, Request, Response, NextFunction } from 'express';
import { HttpExeption } from '../interface/httpExeption';
import { userSignUpValidation } from '../validations/userValidator';
import bcrypt from 'bcryptjs';
import { generateHash } from '../utils/generateHash';
import { sendMail } from '../utils/sendMails';
import { validationResult } from 'express-validator';
import { IUser, UserModel } from '../models/User';
import jwt from 'jsonwebtoken';
import passport from "passport";
import { Server, Socket } from 'socket.io';

// export class UserController implements IController {
//   public path: string = '/user';
//   public router: Router = Router();
//   public socket!: Socket;
//   public io!: Server;

//   constructor(io: Server){
//     this.initializeRouter();
//     this.io = io;
//   }

//   public initializeRouter(): void{
//     this.router.post(`${this.path}/signup`, userRegisterValidation, this.create);
//     this.router.get(`${this.path}/verify`, this.verify);
//     this.router.post(`${this.path}/signin`, passport.authenticate('local'), updateLastSeen, this.afterLogin);
//     this.router.get(`${this.path}/me`, passport.authenticate('jwt', {session: false}), updateLastSeen, this.getMe);
//     this.router.delete(this.path, passport.authenticate('jwt', {session: false}), this.delete);
//   }

  // private create = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction>  => {
  //   try {
  //     const errors = validationResult(req);
  //     if (!errors.isEmpty()) {
  //       return next(new HttpExeption(400, errors.array()[0].msg));
  //     }

  //     const {email, password, fullName, userName} = req.body;

  //     const condidate = await UserModel.findOne({email});

  //     if (condidate) {
  //       return next(new HttpExeption(409, 'Email already exists'));
  //     }

  //     const hashPassword = await bcrypt.hash(password, 12);

  //     const user = new UserModel({
  //       email, 
  //       fullName, 
  //       userName,
  //       password: hashPassword,
  //       confirm_hash: generateHash(process.env.HASH_STRING || Math.random().toString())
  //     });

  //     await user.save();

  //     await sendMail({
  //       from: 'chatAdmin@rest.com',
  //       html: `Пользователь ${user.userName}, пожалуйста подтвердите свой аккаунт, пройдите по ссылке - <a href="http://localhost:${Number(process.env.PORT || 5000)}/user/verify?hash=${user.confirm_hash}">Подтвердить</a>`,
  //       subject: "Подтверждение аккаунта",
  //       to: user.email
  //     });

  //     res.status(201).json({
  //       status: 'success',
  //       data: user
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     next(new HttpExeption());
  //   }
  // }

  // private verify = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction>  => {
  //   try {
  //     const hash = req.query.hash;

  //     if (!hash) return next(new HttpExeption(404, 'Неверный запрос'));

  //     const user = await UserModel.findOneAndUpdate({confirm_hash: hash.toString()}, {$set: {confirmed: true}});

  //     if (!user) return next(new HttpExeption(401, 'Пользователь не найден'));

  //     res.redirect('http://localhost:3000/auth/signin')
  //   } catch (error) {
  //     console.log(error);
  //     next(new HttpExeption());
  //   }
  // }

  // private afterLogin = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
  //   try {
  //     if (req.user) {
  //       res.json({
  //         status: 'success',
  //         data: {
  //           ...req.user,
  //           password: undefined,
  //           confirm_hash: undefined,
  //         },
  //         token: jwt.sign({data: req.user}, process.env.SECRET_KEY || 'secret key', {expiresIn: "30 d"})
  //       });
  //     } else {
  //       return next(new HttpExeption(403, 'Unauthorized'));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     next(new HttpExeption());
  //   }
  // }

  // private getMe = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
  //   try {
  //     if (req.user) {
  //       res.json({
  //         status: 'success',
  //         data: req.user
  //       });
  //     } else {
  //       return next(new HttpExeption(404, 'User not found'));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return next(new HttpExeption());
  //   }
  // }

  // private delete = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
  //   try {
  //     await UserModel.findByIdAndDelete(req.user);
  //     res.status(202).send();
  //   } catch (error) {
  //     console.log(error);
  //     return next(new HttpExeption());
  //   }
  // }
// }


class UserController {
  index = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
    try {
      const user = req.user as IUser;
      const users = await UserModel.find({$and: [{email: {$not: new RegExp(user.email)}}, {confirmed: true}]});
      res.json({status: 'success', data: users});
    } catch (error) {
      console.log(error);
      next(new HttpExeption());
    }
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction>  => {
    try {
      const {email, password, fullName, userName} = req.body;

      const condidate = await UserModel.findOne({email});

      if (condidate) {
        return next(new HttpExeption(409, 'Email already exists'));
      }

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
        html: `Пользователь ${user.userName}, пожалуйста подтвердите свой аккаунт, пройдите по ссылке - <a href="http://localhost:${Number(process.env.PORT || 5000)}/users/verify?hash=${user.confirm_hash}">Подтвердить</a>`,
        subject: "Подтверждение аккаунта",
        to: user.email
      });

      res.status(201).json({
        status: 'success',
        data: user
      });
    } catch (error) {
      console.log(error);
      next(new HttpExeption());
    }
  }

  verify = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction>  => {
    try {
      const hash = req.query.hash;

      if (!hash) return next(new HttpExeption(404, 'Неверный запрос'));

      const user = await UserModel.findOneAndUpdate({confirm_hash: hash.toString()}, {$set: {confirmed: true}});

      if (!user) return next(new HttpExeption(401, 'Пользователь не найден'));

      res.redirect('http://localhost:3000/auth/signin')
    } catch (error) {
      console.log(error);
      next(new HttpExeption());
    }
  }

  afterLogin = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
    try {
      if (req.user) {
        // res.json({
        //   status: 'success',
        //   data: {
        //     ...req.user,
        //     password: undefined,
        //     confirm_hash: undefined,
        //   },
        //   token: jwt.sign({data: req.user}, process.env.SECRET_KEY || 'secret key', {expiresIn: "30 d"})
        // });

        const token = jwt.sign({data: req.user}, process.env.SECRET_KEY || 'secret key', {expiresIn: "30 d"});

        res.json({
          status: 'success',
          data: {
            user: {
              ...req.user,
              password: undefined,
              confirm_hash: undefined,
            },
            token
          }
        });
      } else {
        return next(new HttpExeption(403, 'Unauthorized'));
      }
    } catch (error) {
      console.log(error);
      next(new HttpExeption());
    }
  }

  getMe = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
    try {
      if (req.user) {
        res.json({
          status: 'success',
          data: req.user
        });
      } else {
        return next(new HttpExeption(404, 'User not found'));
      }
    } catch (error) {
      console.log(error);
      return next(new HttpExeption());
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
    try {
      await UserModel.findByIdAndDelete(req.user);
      res.status(202).send();
    } catch (error) {
      console.log(error);
      return next(new HttpExeption());
    }
  }
}

export const userController = new UserController();