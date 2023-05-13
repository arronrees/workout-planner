import { User } from '@/constant-types';
import Layout from '@/layout/Layout';
import useUser from '@/utils/iron/useUser';
import { withSessionSsr } from '@/utils/iron/withSession';
import {
  ArrowRightOnRectangleIcon,
  LockClosedIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function Profile() {
  const { user }: { user: User } = useUser();

  return (
    <Layout>
      <div className='mb-6'>
        <h1 className='font-extralight text-4xl mb-2'>
          Hello, {user && user.name}
        </h1>
        <p className='font-semibold text-zinc-500'>
          View and update your information
        </p>
      </div>
      <ul className='grid gap-4'>
        <li>
          <Link href='/profile/update/password' className='profile__nav__link'>
            <LockClosedIcon className='w-4 h-6' />
            <span>Update Password</span>
          </Link>
        </li>
        <li>
          <a
            href='/api/auth/signout'
            className='profile__nav__link text-red-700'
          >
            <ArrowRightOnRectangleIcon className='w-4 h-6' />
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </Layout>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, res }) {
    const user = req.session.user;

    if (!user) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    } else {
      return {
        props: {},
      };
    }
  }
);
