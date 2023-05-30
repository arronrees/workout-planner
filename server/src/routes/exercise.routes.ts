import { Router } from 'express';
import { checkNewExerciseObjectValid } from '../middleware/exercise.middleware';
import { createNewExerciseController } from '../controllers/exercise.controller';

export const exerciseRouter = Router();

// get all exercises for user
exerciseRouter.get('/user');

// create new exercise
exerciseRouter.post(
  '/new',
  checkNewExerciseObjectValid,
  createNewExerciseController
);
