import { NextFunction, Request, Response } from 'express';
import {
  userDetailsUpdateModel,
  userPasswordUpdateModel,
} from '../models/user.model';
import { JsonApiResponse } from '../constant-types';
import { z } from 'zod';

export async function checkUserPasswordUpdateObjectValid(
  req: Request,
  res: Response<JsonApiResponse>,
  next: NextFunction
) {
  try {
    const { user } = req.body;

    userPasswordUpdateModel.parse(user);

    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.format());

      return res
        .status(400)
        .json({ success: false, error: err.errors[0].message });
    } else {
      console.error(err);

      next(err);
    }
  }
}

export async function checkUserDetailsUpdteObjectValid(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req.body;

    userDetailsUpdateModel.parse(user);

    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.format());

      return res
        .status(400)
        .json({ success: false, error: err.errors[0].message });
    } else {
      console.error(err);

      next(err);
    }
  }
}
