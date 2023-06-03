import { DotLoader } from 'react-spinners';

export default function LoadingSpinner() {
  return (
    <div className='flex items-center justify-center p-8'>
      <DotLoader color='#60a5fa' />
    </div>
  );
}
