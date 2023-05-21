import { Router } from 'express';
import {
  checkUserDetailsUpdteObjectValid,
  checkUserPasswordUpdateObjectValid,
} from '../middleware/user.middleware';
import {
  getSingleUserController,
  updateUserDetailsController,
  updateUserPasswordController,
} from '../controllers/user.controller';

export const userRouter = Router();

// get single user
userRouter.get('/find/:userId', getSingleUserController);

// update user password
userRouter.put(
  '/update/password',
  checkUserPasswordUpdateObjectValid,
  updateUserPasswordController
);

userRouter.put(
  '/update/details',
  checkUserDetailsUpdteObjectValid,
  updateUserDetailsController
);
