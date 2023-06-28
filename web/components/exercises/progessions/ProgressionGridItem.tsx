import { ExerciseProgression } from '@/constant-types';
import { Menu, Transition } from '@headlessui/react';
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Fragment } from 'react';

type Props = {
  progression: ExerciseProgression;
  index: number;
};

export default function ProgressionGridItem({ progression, index }: Props) {
  return (
    <tr
      className={`border-b border-b-zinc-100 py-3 px-2 relative ${
        index === 0 ? 'bg-zinc-100' : ''
      }`}
    >
      <td className='text-xs text-gray-500 py-3 px-2'>
        {progression.weight} kg
      </td>
      <td className='text-xs text-gray-500 py-3 px-2'>{progression.reps}</td>
      <td className='text-xs text-gray-500 py-3 px-2'>
        {new Date(progression.createdAt).toLocaleDateString()}
      </td>
      <td className='text-xs text-gray-500 py-3 px-2 w-14'>
        <div>
          <Menu>
            <div className='flex items-center justify-center'>
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
                        href={`/`}
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
                        href={`/`}
                        className={`${
                          active ? 'bg-blue-400 text-white' : 'text-gray-900'
                        } flex w-full items-center rounded px-2 py-3 text-xs transition duration-150`}
                      >
                        <TrashIcon className='w-3 h-3 mr-2' />
                        Delete
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </td>
    </tr>
  );
}
