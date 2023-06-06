import DividerLine from '@/components/general/DividerLine';
import { User } from '@/constant-types';
import Link from 'next/link';

type Props = {
  user?: User | null;
};

export default function Navbar({ user }: Props) {
  return (
    <nav
      className='fixed z-50 left-6 border-2 border-zinc-200 rounded bg-zinc-50 shadow-md'
      style={{
        width: 'calc(100vw - 3rem)',
        height: 'calc(100vh - 7.5rem)',
        top: '6rem',
      }}
    >
      <ul className='p-6'>
        {user && (
          <>
            <li>
              <Link href='/exercises' className='nav__link'>
                My Exercises
              </Link>
            </li>
            <li>
              <Link href='/exercises/new' className='nav__link'>
                Create Exercise
              </Link>
            </li>

            <DividerLine className='py-2' />

            <li>
              <Link href='/user/profile' className='nav__link'>
                My Profile
              </Link>
            </li>
            <li>
              <Link href='/api/auth/signout' className='nav__link'>
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
