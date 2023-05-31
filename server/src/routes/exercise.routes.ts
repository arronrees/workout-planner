import { Router } from 'express';
import { checkNewExerciseObjectValid } from '../middleware/exercise.middleware';
import {
  createNewExerciseController,
  findIfSingleExerciseExists,
  getUserExercises,
} from '../controllers/exercise.controller';

export const exerciseRouter = Router();

// get all exercises for user
exerciseRouter.get('/user', getUserExercises);

// get single exercise
exerciseRouter.get('/find/:exerciseId', findIfSingleExerciseExists);

// create new exercise
exerciseRouter.post(
  '/new',
  checkNewExerciseObjectValid,
  createNewExerciseController
);
