export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  emailVerified: boolean;
  token: string;
  image?: string;
  UserSettings?: UserSettings;
};

export enum WeightUnit {
  kg = 'kg',
  lbs = 'lbs',
}

export type UserSettings = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  weightUnit: WeightUnit;
  userId: string;
};

export enum Equipment {
  Full = 'Full',
  Basic = 'Basic',
  None = 'None',
}

export enum MuscleGroup {
  Chest = 'Chest',
  Shoulder = 'Shoulder',
  Back = 'Back',
  Bicep = 'Bicep',
  Tricep = 'Tricep',
  Quad = 'Quad',
  Hamstring = 'Hamstring',
  Calf = 'Calf',
  Glute = 'Glute',
  Abs = 'Abs',
  Core = 'Core',
}

export type Exercise = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  name: string;
  muscleGroup: MuscleGroup;
  equipment: Equipment;
  notes?: string;
  ExerciseProgression: ExerciseProgression[];
};

export type ExerciseProgression = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  exerciseId: string;
  weight: number;
  reps: number;
  sets: number;
};

export type Workout = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  name: string;
  notes: string | null;
  muscleGroup: MuscleGroup;
  equipment: Equipment;
  Exercises: Exercise[];
};
