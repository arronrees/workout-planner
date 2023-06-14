import { ExerciseProgression } from '@/constant-types';

type Props = {
  progression: ExerciseProgression;
  index: number;
};

export default function ProgressionGridItem({ progression, index }: Props) {
  return (
    <div
      className={`grid grid-cols-3 gap-4 items-center border-b border-b-zinc-100 py-3 px-2 ${
        index === 0 ? 'bg-zinc-100' : ''
      }`}
    >
      <p className='text-xs text-gray-500'>{progression.weight} kg</p>
      <p className='text-xs text-gray-500'>{progression.reps}</p>
      <p className='text-xs text-gray-500'>
        {new Date(progression.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
