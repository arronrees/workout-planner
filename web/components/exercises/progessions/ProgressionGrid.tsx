import { Exercise, ExerciseProgression } from '@/constant-types';
import ProgressionGridItem from './ProgressionGridItem';
import NewProgressionModal from './NewProgressionModal';

type Props = {
  progressions: ExerciseProgression[];
  exercise: Exercise;
};

export default function ProgressionGrid({ progressions, exercise }: Props) {
  return (
    <>
      <table className='w-full text-left text-gray-500 overflow-x-auto'>
        <thead className='text-gray-700 bg-white'>
          <tr className='border-b border-b-zinc-200 '>
            <th className='font-medium text-xs pb-2 px-2'>Weight</th>
            <th className='font-medium text-xs pb-2 px-2'>Reps</th>
            <th className='font-medium text-xs pb-2 px-2'>Date</th>
            <th className='font-medium text-xs pb-2 px-2'></th>
          </tr>
        </thead>
        <tbody>
          {progressions &&
            progressions.length > 0 &&
            progressions.map((progression, index) => (
              <ProgressionGridItem
                key={progression.id}
                progression={progression}
                index={index}
              />
            ))}
        </tbody>
      </table>
      <div className='px-2 py-4 bg-zinc-50 rounded'>
        <div className='grid grid-cols-3 gap-4 items-center pb-2 px-2'>
          <NewProgressionModal exercise={exercise} />
        </div>
      </div>
    </>
  );
}
