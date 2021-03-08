import { Router } from 'express';
import { dialogController } from '../constrollers/dialogCOntroller';
import { passport } from '../core/passport';
import { checkValidation } from '../middleware/checkValidation';
import { updateLastSeen } from '../middleware/last_seen';
import { dialogValidatorCreate, dialogValidatorIndex } from '../validations/dialogValidator';
const dialogRouter: Router = Router();

dialogRouter.get('/:author', passport.authenticate('jwt', {session: false}), updateLastSeen, dialogValidatorIndex, checkValidation, dialogController.index);
dialogRouter.post('/', passport.authenticate('jwt', {session: false}), updateLastSeen, dialogValidatorCreate, checkValidation, dialogController.create);

export { dialogRouter }