import { NextFunction, Request, Response } from 'express';
import { JsonApiResponse, ResLocals } from '../constant-types';
import { UserPasswordUpdateType } from '../models/user.model';
import { comparePassword, hashPassword } from '../utils/auth.utils';
import { prismaDB } from '..';
import emailService from '../services/email.service';

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
      await emailService.sendPasswordUpdateNotification(
        currentUser.email,
        currentUser.name
      );

    return;
  } catch (err) {
    console.error(err);

    next(err);
  }
}
