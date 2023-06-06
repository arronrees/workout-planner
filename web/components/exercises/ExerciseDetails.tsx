import { useRouter } from 'next/router';
import DividerLine from '../general/DividerLine';
import LoadingSpinner from '../general/LoadingSpinner';
import { useEffect, useState } from 'react';
import { API_URL } from '@/constants';
import useUser from '@/utils/iron/useUser';
import { Exercise } from '@/constant-types';
import { toast } from 'react-hot-toast';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function ExerciseDetails() {
  const router = useRouter();

  const { user, isLoading: isUserLoading } = useUser();

  const [exercise, setExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    if (user) {
      fetch(`${API_URL}/api/exercises/get/${router.query.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setExercise(data.data);
          } else {
            toast.error('Could not get exercise details, please try again');
            router.push('/exercises');
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error('Could not get exercise details, please try again');
          router.push('/exercises');
        });
    }
  }, [user, router]);

  if (!exercise || isUserLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className='flex justify-between gap-4 items-end'>
        <div>
          <h1 className='page__header__title'>{exercise.name}</h1>
          <p className='page__header__subtitle'>
            {exercise.notes ? exercise.notes : 'No notes for this exercise yet'}
          </p>
        </div>
        <div>
          <Link
            href={`/exercises/${exercise.id}/update`}
            className='flex items-center justify-center px-2'
          >
            <PencilSquareIcon className='w-6 h-6' />
          </Link>
        </div>
      </section>

      <DividerLine />

      <section></section>
    </>
  );
}
