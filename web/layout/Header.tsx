import useUser from '@/utils/iron/useUser';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const { user } = useUser();

  const [navOpen, setNavOpen] = useState<boolean>(false);

  return (
    <header className='flex items-center justify-between'>
      <div className='flex items-center gap-4'>
        <button
          className='px-3 py-4 h-14 rounded shadow flex items-center justify-center bg-grey-light transition duration-150 focus:outline-none ring-offset-2 focus:ring-2 active:ring-2 active:translate-y-[1px] ring-grey-light/50'
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? (
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
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          ) : (
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
          )}
        </button>
        <Link
          href='/'
          className='px-3 py-4 h-14 rounded shadow flex items-center justify-center bg-grey-x-light transition duration-150 focus:outline-none ring-offset-2 focus:ring-2 active:ring-2 active:translate-y-[1px] ring-grey-light/50'
        >
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
              d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
            />
          </svg>
        </Link>
      </div>
      {user && (
        <Link href='/profile'>
          {user.picture ? (
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
          )}
        </Link>
      )}
      {navOpen && (
        <nav
          className='fixed z-50 left-6 border-2 border-grey-light rounded bg-grey-x-light shadow-md'
          style={{
            width: 'calc(100vw - 3rem)',
            height: 'calc(100vh - 7.5rem)',
            top: '6rem',
          }}
        >
          <ul className='p-6'>
            {user && (
              <li>
                <Link href='/profile' className='nav__link'>
                  My Profile
                </Link>
              </li>
            )}
            {user && (
              <li>
                <Link href='/api/auth/signout' className='nav__link'>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
