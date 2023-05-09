import { NextFunction, Request, Response } from 'express';
import { SignupUserType } from '../models/user.model';
import { prismaDB } from '..';
import { createJwtToken, hashPassword } from '../utils/auth.utils';
import { omit } from 'lodash';
import emailService from '../services/email.service';
import randomstring from 'randomstring';
import checkValidUuid from '../utils/index.utils';

// POST /signup
export async function signupUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user }: { user: SignupUserType } = req.body;

    // check if user already exists in db
    const userExists = await prismaDB.user.findUnique({
      where: { email: user.email },
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        error: 'User already registered',
      });
    }

    // user exists, create password hash
    const hash = await hashPassword(user.password);

    const randomString = randomstring.generate();

    const newUser = await prismaDB.user.create({
      data: { ...user, password: hash, emailVerificationString: randomString },
    });

    // generate token
    const token = createJwtToken(newUser.id);

    // send verification email
    const verificationEmailMessage = await emailService.sendEmailVerification(
      newUser.email,
      newUser.id,
      newUser.name,
      randomString
    );

    return res.status(200).json({
      success: true,
      data: omit({ ...newUser, token }, [
        'password',
        'emailVerificationString',
      ]),
    });
  } catch (err) {
    console.error(err);

    next(err);
  }
}

// POST /email/verify/:id/:token
export async function verifyEmailController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, token }: { id?: string; token?: string } = req.params;

    if (!id || !token) {
      return res
        .status(400)
        .json({ success: false, error: 'No ID or token provided' });
    }

    if (!checkValidUuid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid ID' });
    }

    const user = await prismaDB.user.findUnique({ where: { id } });

    if (user) {
      if (user.emailVerified) {
        return res.status(200).json({ success: true });
      }

      if (user.emailVerificationString === token) {
        await prismaDB.user.update({
          where: { id },
          data: { emailVerified: true, emailVerificationString: null },
        });

        return res.status(200).json({ success: true });
      }
    }

    return res.status(400).json({
      success: false,
      error: 'Something went wrong, please try again',
    });
  } catch (err) {
    console.error(err);

    next(err);
  }
}
