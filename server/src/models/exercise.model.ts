import { z } from 'zod';

export const newExerciseModel = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  muscleGroup: z.enum(
    [
      'Chest',
      'Shoulder',
      'Back',
      'Bicep',
      'Tricep',
      'Quad',
      'Hamstring',
      'Calf',
      'Glute',
    ],
    {
      required_error: 'Muscle Group is required',
      invalid_type_error: 'Invalid Muscle Group',
    }
  ),
  equipment: z.enum(['Full', 'Basic', 'None'], {
    required_error: 'Equipment is required',
    invalid_type_error: 'Invalid equipment value',
  }),
  notes: z
    .string({
      invalid_type_error: 'Notes must be a string',
    })
    .optional(),
});

export type NewExerciseType = z.infer<typeof newExerciseModel>;

export const updateExerciseModel = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  muscleGroup: z.enum(
    [
      'Chest',
      'Shoulder',
      'Back',
      'Bicep',
      'Tricep',
      'Quad',
      'Hamstring',
      'Calf',
      'Glute',
    ],
    {
      required_error: 'Muscle Group is required',
      invalid_type_error: 'Invalid Muscle Group',
    }
  ),
  equipment: z.enum(['Full', 'Basic', 'None'], {
    required_error: 'Equipment is required',
    invalid_type_error: 'Invalid equipment value',
  }),
  notes: z
    .string({
      invalid_type_error: 'Notes must be a string',
    })
    .optional(),
});

export type UpdateExerciseType = z.infer<typeof updateExerciseModel>;
