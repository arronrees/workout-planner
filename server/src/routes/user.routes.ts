import { Router } from 'express';
import {
  checkUserDetailsUpdteObjectValid,
  checkUserPasswordUpdateObjectValid,
} from '../middleware/user.middleware';
import {
  getSingleUserController,
  updateUserDetailsController,
  updateUserPasswordController,
  updateUserProfileImageController,
} from '../controllers/user.controller';
import { multerUpload } from '../constants';

export const userRouter = Router();

// get single user
userRouter.get('/find/:userId', getSingleUserController);

// update user password
userRouter.put(
  '/update/password',
  checkUserPasswordUpdateObjectValid,
  updateUserPasswordController
);

// update user details
userRouter.put(
  '/update/details',
  checkUserDetailsUpdteObjectValid,
  updateUserDetailsController
);

// update user profile image
userRouter.post(
  '/update/image',
  multerUpload.single('profileImageFile'),
  updateUserProfileImageController
);
