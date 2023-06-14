import { ExerciseProgression } from '@/constant-types';
import ProgressionGridItem from './ProgressionGridItem';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/solid';

type Props = {
  progressions: ExerciseProgression[];
};

export default function ProgressionGrid({ progressions }: Props) {
  return (
    <div className='px-2 py-4 bg-zinc-50 rounded'>
      <div className='grid grid-cols-3 gap-4 items-center border-b border-b-zinc-200 pb-2 px-2'>
        <p className='font-medium text-xs'>Weight</p>
        <p className='font-medium text-xs'>Reps</p>
        <p className='font-medium text-xs'>Date</p>
      </div>
      {progressions &&
        progressions.length > 0 &&
        progressions.map((progression, index) => (
          <ProgressionGridItem
            key={progression.id}
            progression={progression}
            index={index}
          />
        ))}
      <div className='grid grid-cols-3 gap-4 items-center pb-2 px-2'>
        <div className='col-span-3 py-2'>
          <Link
            href='/exercises/progress/new'
            className='p-2 border border-gray-100 rounded text-xs flex justify-start items-center gap-4 relative text-gray-400 hover:text-gray-700 focus:text-gray-700 hover:border-gray-300 focus:border-gray-300 transition duration-150'
          >
            <PlusIcon className='w-4 h-4' />
            <span>Add progress</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
