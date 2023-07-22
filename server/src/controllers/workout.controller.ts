import { NextFunction, Request, Response } from 'express';
import { NewWorkoutType } from '../models/workout.model';
import { prismaDB } from '..';
import { JsonApiResponse, ResLocals } from '../constant-types';
import { isValidUuid } from '../utils/index.utils';

// GET /user
export async function getUserWorkouts(
  req: Request,
  res: Response<JsonApiResponse> & { locals: ResLocals },
  next: NextFunction
) {
  try {
    const { user } = res.locals;

    const workouts = await prismaDB.workout.findMany({
      where: {
        userId: user.id,
      },
      orderBy: { createdAt: 'asc' },
      include: {
        Exercises: true,
      },
    });

    return res.status(200).json({ success: true, data: workouts });
  } catch (err) {
    console.error(err);

    next(err);
  }
}

// GET /find/:workoutId
export async function findIfSingleWorkoutExists(
  req: Request,
  res: Response<JsonApiResponse> & { locals: ResLocals },
  next: NextFunction
) {
  try {
    const { workoutId } = req.params;

    if (!workoutId || !isValidUuid(workoutId)) {
      return res
        .status(404)
        .json({ success: false, error: 'Workout not found' });
    }

    const workoutFound = await prismaDB.workout.findUnique({
      where: { id: workoutId },
      select: { id: true },
    });

    if (workoutFound) {
      return res.status(200).json({ success: true });
    } else {
      return res
        .status(404)
        .json({ success: false, error: 'Workout not found' });
    }
  } catch (err) {
    console.error(err);

    next(err);
  }
}

// GET /get/:workoutId
export async function getSingleWorkout(
  req: Request,
  res: Response<JsonApiResponse> & { locals: ResLocals },
  next: NextFunction
) {
  try {
    const { workoutId } = req.params;

    if (!workoutId || !isValidUuid(workoutId)) {
      return res
        .status(404)
        .json({ success: false, error: 'Workout not found' });
    }

    const workoutFound = await prismaDB.workout.findUnique({
      where: { id: workoutId },
      include: {
        Exercises: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (workoutFound) {
      return res.status(200).json({ success: true, data: workoutFound });
    } else {
      return res
        .status(404)
        .json({ success: false, error: 'Workout not found' });
    }
  } catch (err) {
    console.error(err);

    next(err);
  }
}

// POST /new
export async function createNewWorkoutController(
  req: Request,
  res: Response<JsonApiResponse> & { locals: ResLocals },
  next: NextFunction
) {
  try {
    const { workout }: { workout: NewWorkoutType } = req.body;

    const { user } = res.locals;

    const { exercises, ...workoutToCreate } = workout;

    for (let i = 0; i < exercises.length; i++) {
      const exercise = exercises[i];

      if (!isValidUuid(exercise)) {
        return res
          .status(400)
          .json({ success: false, error: 'Invalid exercise ID' });
      }
    }

    const newWorkout = await prismaDB.workout.create({
      data: {
        ...workoutToCreate,
        User: {
          connect: { id: user.id },
        },
        Exercises: {
          connect: exercises?.map((exercise) => ({ id: exercise })),
        },
      },
    });

    return res.status(200).json({ success: true, data: newWorkout });
  } catch (err) {
    console.error(err);

    next(err);
  }
}
