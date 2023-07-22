import { Router } from 'express';
import { checkNewWorkoutObjectValid } from '../middleware/workout.middleware';
import {
  createNewWorkoutController,
  findIfSingleWorkoutExists,
  getSingleWorkout,
  getUserWorkouts,
} from '../controllers/workout.controller';

export const workoutRouter = Router();

// get all workouts for user
workoutRouter.get('/user', getUserWorkouts);

// find single workout
workoutRouter.get('/find/:workoutId', findIfSingleWorkoutExists);

// get single workout
workoutRouter.get('/get/:workoutId', getSingleWorkout);

// create new workout
workoutRouter.post(
  '/new',
  checkNewWorkoutObjectValid,
  createNewWorkoutController
);
