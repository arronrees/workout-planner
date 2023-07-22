import { NextFunction, Request, Response } from 'express';
import { JsonApiResponse, ResLocals } from '../constant-types';
import { newWorkoutModel } from '../models/workout.model';
import { z } from 'zod';

export async function checkNewWorkoutObjectValid(
  req: Request,
  res: Response<JsonApiResponse> & { locals: ResLocals },
  next: NextFunction
) {
  try {
    const { workout } = req.body;

    newWorkoutModel.parse(workout);

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
