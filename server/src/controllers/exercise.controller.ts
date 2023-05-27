import { NextFunction, Request, Response } from 'express';
import { JsonApiResponse, ResLocals } from '../constant-types';
import { NewExerciseType } from '../models/exercise.model';
import { prismaDB } from '..';

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
