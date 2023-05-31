import { Exercise } from '@/constant-types';
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
};

export default function ExerciseGridItem({ exercise }: Props) {
  return (
    <div className='p-4 border rounded text-xs flex justify-between items-center gap-4 relative'>
      <div>
        <p className='font-semibold mb-2'>{exercise.name}</p>
        <div className='flex gap-2 items-center text-gray-600 font-light'>
          <p>{exercise.equipment}</p>
          <span className='h-4 w-[1px] bg-gray-200 block'></span>
          <p>{exercise.muscleGroup}</p>
        </div>
      </div>
      <div>
        <Menu>
          <div>
            <Menu.Button>
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
            <Menu.Items className='absolute right-2 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20'>
              <div className='p-2'>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href=''
                      className={`${
                        active ? 'bg-blue-400 text-white' : 'text-gray-900'
                      } flex w-full items-center rounded px-2 py-2 text-sm transition duration-150`}
                    >
                      <PencilIcon className='w-4 h-4 mr-2' />
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
                      } flex w-full items-center rounded px-2 py-2 text-sm transition duration-150`}
                    >
                      <QueueListIcon className='w-4 h-4 mr-2' />
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
                      } flex w-full items-center rounded px-2 py-2 text-sm transition duration-150`}
                    >
                      <ChartBarIcon className='w-4 h-4 mr-2' />
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
