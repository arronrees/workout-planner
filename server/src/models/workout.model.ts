import { z } from 'zod';

export const newWorkoutModel = z.object({
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
      'Abs',
      'Core',
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
  exercises: z
    .string({ invalid_type_error: 'Exercise Id must be a string' })
    .array(),
});

export type NewWorkoutType = z.infer<typeof newWorkoutModel>;
