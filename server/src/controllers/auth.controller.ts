import { NextFunction, Request, Response } from 'express';
import { SigninUserType, SignupUserType } from '../models/user.model';
import { prismaDB } from '..';
import {
  comparePassword,
  createJwtToken,
  hashPassword,
} from '../utils/auth.utils';
import { omit } from 'lodash';
import emailService from '../services/email.service';
import randomstring from 'randomstring';
import checkValidUuid from '../utils/index.utils';
import { JsonApiResponse } from '../constant-types';

// POST /signup
export async function signupUserController(
  req: Request,
  res: Response<JsonApiResponse>,
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

    res.status(200).json({
      success: true,
      data: omit({ ...newUser, token }, [
        'password',
        'emailVerificationString',
      ]),
    });

    // send verification email
    const verificationEmailMessage = await emailService.sendEmailVerification(
      newUser.email,
      newUser.id,
      newUser.name,
      randomString
    );

    return;
  } catch (err) {
    console.error(err);

    next(err);
  }
}

// POST /signin
export async function signinUserController(
  req: Request,
  res: Response<JsonApiResponse>,
  next: NextFunction
) {
  try {
    const { user }: { user: SigninUserType } = req.body;

    // check if user exists in db before checking password
    const userExists = await prismaDB.user.findUnique({
      where: { email: user.email },
    });

    if (!userExists) {
      return res
        .status(401)
        .json({ success: false, error: 'Incorrect details, please try again' });
    }

    // compare passwords
    const passwordCheck = await comparePassword(
      user.password,
      userExists.password
    );

    if (!passwordCheck) {
      return res
        .status(401)
        .json({ success: false, error: 'Incorrect details, please try again' });
    }

    // generate token
    const token = createJwtToken(userExists.id);

    return res.status(200).json({
      success: true,
      data: omit({ ...userExists, token }, [
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
  res: Response<JsonApiResponse>,
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

// POST /password/reset?email=userEmail
export async function requestPasswordResetController(
  req: Request,
  res: Response<JsonApiResponse>,
  next: NextFunction
) {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const randomString = randomstring.generate();

    const user = await prismaDB.user.update({
      where: { email: email.toString() },
      data: {
        passwordResetString: randomString,
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.status(200).json({ success: true });

    const resetPasswordEmail = await emailService.sendPasswordResetEmail({
      email: user.email,
      name: user.name,
      id: user.id,
      randomString,
    });

    return;
  } catch (err) {
    console.error(err);

    next(err);
  }
}
