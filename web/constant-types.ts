export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  emailVerified: boolean;
  token: string;
  image?: string;
};

enum Equipment {
  Full = 'Full',
  Basic = 'Basic',
  None = 'None',
}

enum MuscleGroup {
  Chest = 'Chest',
  Shoulder = 'Shoulder',
  Back = 'Back',
  Bicep = 'Bicep',
  Tricep = 'Tricep',
  Quad = 'Quad',
  Hamstring = 'Hamstring',
  Calf = 'Calf',
  Glute = 'Glute',
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
