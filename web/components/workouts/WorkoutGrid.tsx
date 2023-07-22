import { Workout } from '@/constant-types';
import { API_URL } from '@/constants';
import useUser from '@/utils/iron/useUser';
import { ReactNode, useEffect, useState } from 'react';
import WorkoutGridItem from './WorkoutGridItem';

type Props = {
  children?: ReactNode;
};

export default function WorkoutGrid({ children }: Props) {
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetch(`${API_URL}/api/workouts/user`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setWorkouts(data.data))
        .catch((err) => {
          console.error(err);
          setWorkouts(null);
        });
    }
  }, [user]);

  return (
    <section className='grid gap-2'>
      {workouts &&
        workouts.map((workout) => (
          <WorkoutGridItem key={workout.id} workout={workout} />
        ))}
      {children && <div>{children}</div>}
    </section>
  );
}
