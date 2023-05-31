import { PlusIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function NewExerciseGridItem() {
  return (
    <Link
      href='/exercises/new'
      className='p-4 border border-gray-100 rounded text-xs flex justify-start items-center gap-4 relative text-gray-400 hover:text-gray-700 focus:text-gray-700 hover:border-gray-300 focus:border-gray-300 transition duration-150'
    >
      <PlusIcon className='w-4 h-4' />
      <span>Add new exercise</span>
    </Link>
  );
}
