import { Exercise, ExerciseProgression } from '@/constant-types';
import ProgressionGridItem from './ProgressionGridItem';
import NewProgressionModal from './NewProgressionModal';

type Props = {
  progressions: ExerciseProgression[];
  exercise: Exercise;
};

export default function ProgressionGrid({ progressions, exercise }: Props) {
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
        <NewProgressionModal exercise={exercise} />
      </div>
    </div>
  );
}
