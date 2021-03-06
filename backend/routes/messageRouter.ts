import { Router } from 'express';
import { messageController } from '../constrollers/messageController';
import { passport } from '../core/passport';
import { checkValidation } from '../middleware/checkValidation';
import { updateLastSeen } from '../middleware/last_seen';
import { messageValidatorCreate, messageValidatorIndex } from '../validations/messageValidator';
const messageRouter: Router = Router();

// this.router.get(this.path, passport.authenticate('jwt', {session: false}), updateLastSeen, messageValidatorIndex, this.index);
// this.router.post(`${this.path}/create`, passport.authenticate('jwt', {session: false}), updateLastSeen, messageValidatorCreate, this.create);

messageRouter.get('/', passport.authenticate('jwt', {session: false}), updateLastSeen, messageValidatorIndex, checkValidation, messageController.index);
messageRouter.post('/', passport.authenticate('jwt', {session: false}), updateLastSeen, messageValidatorCreate, checkValidation, messageController.create);

export { messageRouter }