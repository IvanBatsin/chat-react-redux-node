import { param, body } from 'express-validator';
import { checkIdType } from '../utils/checkIdType';

export const dialogValidatorIndex = [
  param('author', 'Не указан author')
    .notEmpty().withMessage('Не указан author')
    .custom((value, {req}) => {
      if (!checkIdType(value)) {
        throw new Error('Не верный тип author');
      }
      return value;
    })
];

export const dialogValidatorCreate = [
  body('text')
    .trim()
    .isString().withMessage('Не верный формат сообщения'),

  body('author', 'Не указан author')
    .isString().withMessage('Не верный тип author')
    .notEmpty().withMessage('Не указан author')
    .custom((value, {req}) => {
      if (!checkIdType(value)) {
        throw new Error('Не верный тип author');
      }
      return value;
    }),

  body('partner', 'Не указан partner')
    .notEmpty().withMessage('Не указан partner')
    .custom((value, {req}) => {
      if (!checkIdType(value)) {
        throw new Error('Не верный тип partner');
      }
      return value;
    }),
];