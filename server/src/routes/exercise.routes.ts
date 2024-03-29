import { Router } from 'express';
import {
  checkNewExerciseObjectValid,
  checkNewExerciseProgressionObjectValid,
} from '../middleware/exercise.middleware';
import {
  createNewExerciseController,
  createNewExerciseProgressionController,
  deleteSingleExerciseProgressionController,
  findIfSingleExerciseExists,
  getSingleExercise,
  getUserExercises,
  updateSingleExerciseController,
} from '../controllers/exercise.controller';
import { checkUpdateExerciseObjectValid } from '../middleware/exercise.middleware';

export const exerciseRouter = Router();

// get all exercises for user
exerciseRouter.get('/user', getUserExercises);

// find single exercise
exerciseRouter.get('/find/:exerciseId', findIfSingleExerciseExists);

// get single exercise
exerciseRouter.get('/get/:exerciseId', getSingleExercise);

// create new exercise
exerciseRouter.post(
  '/new',
  checkNewExerciseObjectValid,
  createNewExerciseController
);

// update single exercise
exerciseRouter.put(
  '/update/:exerciseId',
  checkUpdateExerciseObjectValid,
  updateSingleExerciseController
);

//
// progressions
//

// create new exercise progression
exerciseRouter.post(
  '/progression/new/:exerciseId',
  checkNewExerciseProgressionObjectValid,
  createNewExerciseProgressionController
);

// delete exercise progression
exerciseRouter.delete(
  '/progression/delete/:progressionId',
  deleteSingleExerciseProgressionController
);
