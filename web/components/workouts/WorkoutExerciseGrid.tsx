import { Exercise } from '@/constant-types';
import WorkoutExerciseGridItem from './WorkoutExerciseGridItem';
import useUser from '@/utils/iron/useUser';

type Props = {
  exercises: Exercise[];
};

export default function WorkoutExerciseGrid({ exercises }: Props) {
  const { user } = useUser();

  return (
    <section className='grid gap-2'>
      {exercises &&
        exercises.map((exercise) => (
          <WorkoutExerciseGridItem
            key={exercise.id}
            exercise={exercise}
            user={user}
          />
        ))}
    </section>
  );
}
