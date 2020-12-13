import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Введите email')
    .isString()
    .isEmail()
    .withMessage('Неверный адресс электронной почты'),
  body('fullName', 'Введите имя')
    .isString()
    .isLength({min: 2})
    .withMessage('Минимальное кол-во символов 2'),
  body('userName', 'Введите логин')
    .isString()
    .isLength({min: 2})
    .withMessage('Минимальное кол-во символов 2'),
  body('password', 'Введите пароль')
    .isString()
    .isLength({min: 6})
    .withMessage('Минимальное кол-во символов 6')
    .custom((value, {req}) => {
      if (value !== req.body.password2) throw new Error('пароли не совпадают');
      return value;
    })
];