import { body, query } from 'express-validator';
import { checkIdType } from '../utils/checkIdType';

export const messageValidatorIndex = [
  query('dialog', 'Не указан dialog')
    .isString().withMessage('Не верный формат dialog')
    .custom((value, {req}) => {
      if (!checkIdType(value)) {
        throw new Error('Не верный формат dialog');
      }
      return value;
    })
];

export const messageValidatorCreate = [
  body('text')
    .isString().withMessage('Не верный формат сообщения'),
  
  body('author', 'Не указан автор сообщения')
    .isString().withMessage('Не верный формат автора сообщения')
    .custom((value, {req}) => {
      if (!checkIdType(value)) {
        throw new Error('Не верный формат автора сообщения');
      }
      return value;
    }),

  body('partner', 'Не указан партнер сообщения')
    .isString().withMessage('Не верный формат партнера сообщения')
    .custom((value, {req}) => {
      if (!checkIdType(value)) {
        throw new Error('Не верный формат партнера сообщения');
      }
      return value;
    }),

  body('dialog', 'Не указан диалог')
    .isString().withMessage('Не верный формат диалога')
    .custom((value, {req}) => {
      if (!checkIdType(value)) {
        throw new Error('Не верный формат диалога');
      }
      return value;
    }),
];