import { body } from 'express-validator';

export const userSignUpValidation = [
  body('email', 'Введите email')
    .isString().withMessage('E-mail должен быть строкой')
    .isEmail().withMessage('Неверный адресс электронной почты'),

  body('fullName', 'Введите имя')
    .isString().withMessage('Имя должно быть строкой')
    .isLength({min: 2}).withMessage('Минимальное кол-во символов 2'),

  body('userName', 'Введите логин')
    .isString().withMessage('Логин должен быть строкой')
    .isLength({min: 2}).withMessage('Минимальное кол-во символов 2'),

  body('password', 'Введите пароль')
    .isString().withMessage('Пароль должен быть строкой')
    .isLength({min: 6}).withMessage('Минимальное кол-во символов 6')
    .custom((value, {req}) => {
      if (value !== req.body.password2) throw new Error('пароли не совпадают');
      return value;
    })
];


export const userSignInValidation = [
  body('email', 'Введите email')
    .notEmpty().withMessage('Введите email')
    .isString().withMessage('E-mail должен быть строкой')
    .isEmail().withMessage('Неверный адресс электронной почты'),

  body('password', 'Введите пароль')
    .notEmpty().withMessage('Введите пароль')
    .isString().withMessage('Пароль должен быть строкой')
    .isLength({min: 6}).withMessage('Минимальное кол-во символов 6')
];