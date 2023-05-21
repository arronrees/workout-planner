import { NextFunction, Request, Response } from 'express';
import { JsonApiResponse, ResLocals } from '../constant-types';
import {
  UserDetailsUpdateType,
  UserPasswordUpdateType,
} from '../models/user.model';
import { comparePassword, hashPassword } from '../utils/auth.utils';
import { prismaDB } from '..';
import emailService from '../services/email.service';
import randomstring from 'randomstring';
import { omit } from 'lodash';
import { userDataToOmitFromResponse } from '../constants';

// GET /find/:userId
export async function getSingleUserController(
  req: Request,
  res: Response<JsonApiResponse> & { locals: ResLocals },
  next: NextFunction
) {
  try {
    const { userId }: { userId?: string } = req.params;

    const { user, userToken: token } = res.locals;

    if (userId !== user.id) {
      return res.status(401).json({ success: false, error: 'Invalid user' });
    }

    return res.status(200).json({
      success: true,
      data: omit({ ...user, token }, userDataToOmitFromResponse),
    });
  } catch (err) {
    console.error(err);

    next(err);
  }
}

// PUT /update/password
export async function updateUserPasswordController(
  req: Request,
  res: Response<JsonApiResponse> & { locals: ResLocals },
  next: NextFunction
) {
  try {
    const { user: currentUser } = res.locals;
    const { user }: { user: UserPasswordUpdateType } = req.body;

    if (!currentUser) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // compare passwords
    const passwordCheck = await comparePassword(
      user.password,
      currentUser.password
    );

    if (passwordCheck) {
      return res.status(400).json({
        success: false,
        error: 'New password cannot be the same as current password',
      });
    }

    const hash = await hashPassword(user.password);

    const updatedUser = await prismaDB.user.update({
      where: { id: currentUser.id },
      data: {
        password: hash,
      },
    });

    res.status(200).json({ success: true });

    // send email notification
    const passwordNotificationMessage =
      await emailService.sendPasswordUpdateNotification({
        email: currentUser.email,
        name: currentUser.name,
      });

    return;
  } catch (err) {
    console.error(err);

    next(err);
  }
}

// PUT /update/details
export async function updateUserDetailsController(
  req: Request,
  res: Response<JsonApiResponse> & { locals: ResLocals },
  next: NextFunction
) {
  try {
    const { user: currentUser } = res.locals;
    const { user }: { user: UserDetailsUpdateType } = req.body;

    if (!currentUser) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // is email new?
    const isEmailNew: boolean = user.email !== currentUser.email;

    if (isEmailNew) {
      const isEmailRegistered = await prismaDB.user.findUnique({
        where: { email: user.email },
      });

      if (isEmailRegistered) {
        return res
          .status(400)
          .json({ success: false, error: 'Email already registered' });
      }
    }

    const randomString = randomstring.generate();

    const updatedUser = await prismaDB.user.update({
      where: { id: currentUser.id },
      data: {
        name: user.name,
        email: user.email,
        emailVerified: isEmailNew ? false : currentUser.emailVerified,
        emailVerificationString: isEmailNew ? randomString : null,
      },
    });

    res.status(200).json({ success: true });

    // send verification email
    const verificationEmailMessage = await emailService.sendEmailVerification({
      email: updatedUser.email,
      id: updatedUser.id,
      name: updatedUser.name,
      randomString,
    });

    return;
  } catch (err) {
    console.error(err);

    next(err);
  }
}
