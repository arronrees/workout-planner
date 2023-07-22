import { Exercise, User } from '@/constant-types';
import { Menu, Transition } from '@headlessui/react';
import {
  EllipsisVerticalIcon,
  PencilIcon,
  ChartBarIcon,
  QueueListIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Fragment } from 'react';

type Props = {
  exercise: Exercise;
  user?: User | null;
};

export default function WorkoutExerciseGridItem({ exercise, user }: Props) {
  return (
    <div className='p-4 border rounded text-xs flex justify-between items-center gap-4 relative'>
      <Link href={`/exercises/${exercise.id}`}>
        <div className='flex gap-6 items-center text-gray-600 font-light'>
          <p className='font-semibold'>{exercise.name}</p>
          <span className='h-4 w-[1px] bg-gray-200 block'></span>
          <div className='flex gap-1 items-center'>
            <p>{exercise.ExerciseProgression[0].sets}</p>
            <span>x</span>
            <p>{exercise.ExerciseProgression[0].reps}</p>
            <span className='font-semibold'>@</span>
            <p>
              {exercise.ExerciseProgression[0].weight}{' '}
              {user?.UserSettings?.weightUnit}
            </p>
          </div>
        </div>
      </Link>
      <div>
        <Menu>
          <div>
            <Menu.Button className='flex items-center justify-center'>
              <EllipsisVerticalIcon className='w-6 h-6' />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-2 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20'>
              <div className='p-2'>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={`/exercises/${exercise.id}/update`}
                      className={`${
                        active ? 'bg-blue-400 text-white' : 'text-gray-900'
                      } flex w-full items-center rounded px-2 py-3 text-xs transition duration-150`}
                    >
                      <PencilIcon className='w-3 h-3 mr-2' />
                      Edit
                    </Link>
                  )}
                </Menu.Item>
                <div className='h-[1px] w-full bg-zinc-100 my-1'></div>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href=''
                      className={`${
                        active ? 'bg-blue-400 text-white' : 'text-gray-900'
                      } flex w-full items-center rounded px-2 py-3 text-xs transition duration-150`}
                    >
                      <QueueListIcon className='w-3 h-3 mr-2' />
                      View exercise history
                    </Link>
                  )}
                </Menu.Item>
                <div className='h-[1px] w-full bg-zinc-100 my-1'></div>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href=''
                      className={`${
                        active ? 'bg-blue-400 text-white' : 'text-gray-900'
                      } flex w-full items-center rounded px-2 py-3 text-xs transition duration-150`}
                    >
                      <ChartBarIcon className='w-3 h-3 mr-2' />
                      Add new weight
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
