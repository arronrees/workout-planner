import { Router } from 'express';
import { checkUserSignupObjectValid } from '../middleware/auth.middleware';
import {
  signupUserController,
  verifyEmailController,
} from '../controllers/auth.controller';

export const authRouter = Router();

// user signup
authRouter.post('/signup', checkUserSignupObjectValid, signupUserController);

// user verify email address
authRouter.post('/email/verify/:id/:token', verifyEmailController);
