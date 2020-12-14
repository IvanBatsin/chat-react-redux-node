import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { generateHash } from '../utils/generateHash';
import { sendMail } from '../utils/sendMails';
import jwt from 'jsonwebtoken';
import path from 'path';

class UserController {
  static async index(req: Request, res: Response): Promise<void> {
    try {
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
        data: error
      });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 400,
        error: errors.array()
      });
      return;
    }

    try {
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
      res.status(500).json({
        status: 'error',
        data: error
      });
    }
  }

  static async verify(req: Request, res: Response): Promise<void> {
    try {
      const hash = req.query.hash;

      if (!hash) {
        res.status(404).send();
        return;
      }

      const user = await UserModel.findOneAndUpdate({confirm_hash: hash.toString()}, {$set: {confirmed: true}});

      if (!user) {
        res.status(401).send();
        return;
      }

      res.sendFile(path.join(__dirname, '../public/index.html'));
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
        data: error
      });
    }
  }

  static async afterLofin(req: Request, res: Response): Promise<void> {
    try {
      if (req.user) {
        res.json({
          status: 'success',
          data: {
            ...req.user,
            token: jwt.sign({data: req.user}, process.env.SECRET_KEY || 'secret key', {expiresIn: "30 d"})
          }
        });
      } else {
        res.status(403).send();
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
        error: error
      });
    }
  }
}

export { UserController };