import { Exercise } from '@/constant-types';
import { API_URL } from '@/constants';
import useUser from '@/utils/iron/useUser';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

export default function ExerciseGrid() {
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
          <div
            key={exercise.id}
            className='p-4 border rounded text-xs flex justify-between items-center gap-4'
          >
            <div>
              <p className='font-semibold mb-2'>{exercise.name}</p>
              <div className='flex gap-2 items-center text-gray-400 font-thin'>
                <p>{exercise.equipment}</p>
                <span className='h-4 w-[1px] bg-gray-200 block'></span>
                <p>{exercise.muscleGroup}</p>
              </div>
            </div>
            <div>
              <button type='button'>
                <EllipsisVerticalIcon className='w-6 h-6' />
              </button>
            </div>
          </div>
        ))}
    </section>
  );
}
