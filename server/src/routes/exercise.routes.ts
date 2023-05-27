import { Router } from 'express';
import { checkNewExerciseObjectValid } from '../middleware/exercise.middleware';
import { createNewExerciseController } from '../controllers/exercise.controller';

export const exerciseRouter = Router();

// create new exercise
exerciseRouter.post(
  '/new',
  checkNewExerciseObjectValid,
  createNewExerciseController
);
