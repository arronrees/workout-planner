import { NextFunction, Request, Response } from 'express';
import { JsonApiResponse, ResLocals } from '../constant-types';
import {
  newExerciseModel,
  newExerciseProgressionModel,
  updateExerciseModel,
} from '../models/exercise.model';
import { z } from 'zod';

export async function checkNewExerciseObjectValid(
  req: Request,
  res: Response<JsonApiResponse> & { locals: ResLocals },
  next: NextFunction
) {
  try {
    const { exercise } = req.body;

    newExerciseModel.parse(exercise);

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

export async function checkUpdateExerciseObjectValid(
  req: Request,
  res: Response<JsonApiResponse> & { locals: ResLocals },
  next: NextFunction
) {
  try {
    const { exercise } = req.body;

    updateExerciseModel.parse(exercise);

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

export async function checkNewExerciseProgressionObjectValid(
  req: Request,
  res: Response<JsonApiResponse> & { locals: ResLocals },
  next: NextFunction
) {
  try {
    const { progression } = req.body;

    newExerciseProgressionModel.parse(progression);

    next();
  } catch (err) {
    console.error(err);

    next(err);
  }
}
