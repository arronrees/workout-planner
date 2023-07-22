import { useRouter } from 'next/router';
import DividerLine from '../general/DividerLine';
import LoadingSpinner from '../general/LoadingSpinner';
import { useEffect, useState } from 'react';
import { API_URL } from '@/constants';
import useUser from '@/utils/iron/useUser';
import { Exercise, Workout } from '@/constant-types';
import { toast } from 'react-hot-toast';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import WorkoutExerciseGrid from './WorkoutExerciseGrid';

export default function ExerciseDetails() {
  const router = useRouter();

  const { user, isLoading: isUserLoading } = useUser();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [exercises, setExercises] = useState<Exercise[] | null>(null);

  useEffect(() => {
    if (user) {
      fetch(`${API_URL}/api/workouts/get/${router.query.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setWorkout(data.data);
            setExercises(data.data.Exercises);
          } else {
            toast.error('Could not get workout details, please try again');
            router.push('/workouts');
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error('Could not get workout details, please try again');
          router.push('/workouts');
        });
    }
  }, [user, router]);

  if (!workout || isUserLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className='flex justify-between gap-4 items-end'>
        <div>
          <h1 className='page__header__title'>{workout.name}</h1>
          <p className='page__header__subtitle'>
            {workout.notes ? workout.notes : 'No notes for this workout yet'}
          </p>
        </div>
        <div>
          <Link
            href={`/workouts/${workout.id}/update`}
            className='flex items-center justify-center px-2'
          >
            <PencilSquareIcon className='w-6 h-6' />
          </Link>
        </div>
      </section>

      <DividerLine />

      <section className='grid gap-2'>
        {exercises && <WorkoutExerciseGrid exercises={exercises} />}
      </section>
    </>
  );
}
