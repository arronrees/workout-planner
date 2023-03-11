import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const { user } = useUser();

  return (
    <div className='p-6'>
      <header className='flex items-center justify-between'>
        <button className='px-3 py-4 h-14 rounded shadow flex items-center justify-center bg-grey-light transition duration-150 focus:outline-none ring-offset-2 focus:ring-2 active:ring-2 active:translate-y-[1px] ring-grey-light/50'>
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
              d='M3.75 9h16.5m-16.5 6.75h16.5'
              className='stroke-blue-dark'
            />
          </svg>
        </button>
        {user &&
          (user.picture ? (
            <div className='bg-grey-light w-14 h-14 rounded-full border-2 border-blue-dark'>
              <figure>
                <Image
                  src={user.picture}
                  alt=''
                  width={56}
                  height={56}
                  priority
                  className='rounded-full'
                />
              </figure>
            </div>
          ) : (
            <div className='bg-grey-light w-14 h-14 rounded-full border-2 border-blue-dark flex items-center justify-center'>
              <span>{user.name && user.name[0]}</span>
            </div>
          ))}
      </header>
      <div className='py-6'>{children}</div>
    </div>
  );
}
