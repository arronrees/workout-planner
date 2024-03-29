import { Exercise } from '@/constant-types';
import { API_URL } from '@/constants';
import useUser from '@/utils/iron/useUser';
import { ReactNode, useEffect, useState } from 'react';
import ExerciseGridItem from './ExerciseGridItem';

type Props = {
  children?: ReactNode;
};

export default function ExerciseGrid({ children }: Props) {
  const [exercises, setExercises] = useState<Exercise[] | null>(null);

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetch(`${API_URL}/api/exercises/user`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setExercises(data.data))
        .catch((err) => {
          console.error(err);
          setExercises(null);
        });
    }
  }, [user]);

  return (
    <section className='grid gap-2'>
      {exercises &&
        exercises.map((exercise) => (
          <ExerciseGridItem key={exercise.id} exercise={exercise} />
        ))}
      {children && <div>{children}</div>}
    </section>
  );
}
