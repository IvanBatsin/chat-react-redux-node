import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.join(__dirname, '.env')});

import './core/db';

import express from 'express';
const app: express.Application = express();

import { registerValidation } from './validations/userValidation';
import { UserController } from './constrollers/userContoroller';
import { passport } from './core/passport';

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post('/user/register', registerValidation, UserController.create);
app.get('/user/verify', UserController.verify);
app.post('/user/login', passport.authenticate('local'), UserController.afterLofin);

app.listen(Number(process.env.PORT) || 5000, () => console.log('we on air'));