import { NextFunction, Request, Response } from 'express';
import { JsonApiResponse, ResLocals } from '../constant-types';
import { NewExerciseType } from '../models/exercise.model';
import { prismaDB } from '..';
import { isValidUuid } from '../utils/index.utils';

// GET /user
export async function getUserExercises(
  req: Request,
  res: Response<JsonApiResponse> & { locals: ResLocals },
  next: NextFunction
) {
  try {
    const { user } = res.locals;

    const exercises = await prismaDB.exercise.findMany({
      where: {
        userId: user.id,
      },
    });

    return res.status(200).json({ success: true, data: exercises });
  } catch (err) {
    console.error(err);

    next(err);
  }
}

// GET /find/:exerciseId
export async function findIfSingleExerciseExists(
  req: Request,
  res: Response<JsonApiResponse> & { locals: ResLocals },
  next: NextFunction
) {
  try {
    const { exerciseId } = req.params;

    if (!exerciseId || !isValidUuid(exerciseId)) {
      return res
        .status(404)
        .json({ success: false, error: 'Exercise not found' });
    }

    const exerciseFound = await prismaDB.exercise.findUnique({
      where: { id: exerciseId },
      select: { id: true },
    });

    if (exerciseFound) {
      return res.status(200).json({ success: true });
    } else {
      return res
        .status(404)
        .json({ success: false, error: 'Exercise not found' });
    }
  } catch (err) {
    console.error(err);

    next(err);
  }
}

// POST /new
export async function createNewExerciseController(
  req: Request,
  res: Response<JsonApiResponse> & { locals: ResLocals },
  next: NextFunction
) {
  try {
    const { exercise }: { exercise: NewExerciseType } = req.body;

    const { user } = res.locals;

    const newExercise = await prismaDB.exercise.create({
      data: {
        ...exercise,
        User: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return res.status(200).json({ success: true, data: newExercise });
  } catch (err) {
    console.error(err);

    next(err);
  }
}
