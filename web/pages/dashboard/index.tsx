import Layout from '@/layout/Layout';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

type Props = {
  user: UserProfile;
};

export default function Dashboard({ user }: Props) {
  console.log(user);

  return (
    <Layout>
      <div className='mb-6'>
        <h1 className='font-extralight text-4xl mb-2'>
          Hello, {user.name?.split(' ')[0]}
        </h1>
        <p className='font-semibold text-grey'>Let&apos;s get started</p>
      </div>
      <div className='grid gap-3'>
        <Link href='/workouts/new' className='btn btn--blue btn--secondary'>
          New workout
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m7.5-7.5h-15'
              className='stroke-blue-dark'
            />
          </svg>
        </Link>
        <Link href='/' className='btn btn--green btn--secondary'>
          Previous workouts
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5'
              className='stroke-blue-dark'
            />
          </svg>
        </Link>
        <Link href='/' className='btn btn--orange btn--secondary'>
          Randomise workout
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3'
              className='stroke-blue-dark'
            />
          </svg>
        </Link>
      </div>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired();
