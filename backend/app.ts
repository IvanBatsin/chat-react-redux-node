import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.join(__dirname, '.env')});

import './core/db';

import express from 'express';
const app: express.Application = express();

import { registerValidation } from './validations/userValidation';
import { UserController } from './constrollers/userContoroller';
import { DialogController } from './constrollers/dialogController';
import { MessageController } from './constrollers/messageController';
import { updateLastSeen } from './middleware/last_seen';
import { passport } from './core/passport';

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/user/register', registerValidation, UserController.create);
app.get('/user/verify', UserController.verify);
app.post('/user/login', passport.authenticate('local'), updateLastSeen, UserController.afterLofin);

app.post('/dialogs/create', passport.authenticate('jwt', {session: false}), updateLastSeen, DialogController.create);
app.post('/dialogs/:author', passport.authenticate('jwt', {session: false}), updateLastSeen, DialogController.index);

app.get('/messages', passport.authenticate('jwt', {session: false}), updateLastSeen, MessageController.index);
app.post('/messages', passport.authenticate('jwt', {session: false}), updateLastSeen, MessageController.create);

// app.get('/test', passport.authenticate('jwt', {session: false}), updateLastSeen, (req: express.Request, res: express.Response) => {
//   res.send();
// });

app.listen(Number(process.env.PORT) || 5000, () => console.log('we on air'));