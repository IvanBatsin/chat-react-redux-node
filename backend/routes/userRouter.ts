import { Router } from 'express';
import passport from 'passport';
import { userController } from '../constrollers/userContoroller';
import { checkValidation } from '../middleware/checkValidation';
import { updateLastSeen } from '../middleware/last_seen';
import { userSignInValidation, userSignUpValidation } from '../validations/userValidator';
const userRouter: Router = Router();

userRouter.get('/', passport.authenticate('jwt', {session: false}), userController.index);
userRouter.get('/verify', userController.verify);
userRouter.get('/me', passport.authenticate('jwt', {session: false}), updateLastSeen, userController.getMe);
userRouter.post('/signup', userSignUpValidation, checkValidation, userController.create);
userRouter.post('/signin', userSignInValidation, checkValidation, passport.authenticate('local'), updateLastSeen, userController.afterLogin);
userRouter.delete('/', passport.authenticate('jwt', {session: false}), userController.delete);

export { userRouter }