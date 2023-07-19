import { User } from '@/constant-types';
import Layout from '@/layout/Layout';
import { withSessionSsr } from '@/utils/iron/withSession';
import {
  ArrowRightOnRectangleIcon,
  LockClosedIcon,
  QueueListIcon,
  SquaresPlusIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

type PageProps = {
  user: User;
};

export default function Profile({ user }: PageProps) {
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
      <ul className='grid gap-2'>
        <li>
          <Link
            href='/exercises'
            className='profile__nav__link profile__nav__link--blue'
          >
            <QueueListIcon className='w-4 h-6' />
            <span>My Exercises</span>
          </Link>
        </li>
        <li>
          <Link
            href='/exercises/new'
            className='profile__nav__link profile__nav__link--blue'
          >
            <SquaresPlusIcon className='w-4 h-6' />
            <span>New Exercise</span>
          </Link>
        </li>
        <span className='block w-11/12 mx-auto bg-zinc-100 h-[1px] my-[6px]'></span>
        <li>
          <Link
            href='/workouts'
            className='profile__nav__link profile__nav__link--green'
          >
            <QueueListIcon className='w-4 h-6' />
            <span>My Workouts</span>
          </Link>
        </li>
        <li>
          <Link
            href='/workouts/new'
            className='profile__nav__link profile__nav__link--green'
          >
            <SquaresPlusIcon className='w-4 h-6' />
            <span>New Workout</span>
          </Link>
        </li>
        <span className='block w-11/12 mx-auto bg-zinc-100 h-[1px] my-[6px]'></span>
        <li>
          <Link
            href='/user/profile/update/details'
            className='profile__nav__link'
          >
            <UserIcon className='w-4 h-6' />
            <span>Update My Details</span>
          </Link>
        </li>
        <li>
          <Link
            href='/user/profile/update/password'
            className='profile__nav__link'
          >
            <LockClosedIcon className='w-4 h-6' />
            <span>Update Password</span>
          </Link>
        </li>
        <span className='block w-11/12 mx-auto bg-zinc-100 h-[1px] my-[6px]'></span>
        <li>
          <Link
            href='/api/auth/signout'
            className='profile__nav__link profile__nav__link--clear text-red-700'
          >
            <ArrowRightOnRectangleIcon className='w-4 h-6' />
            <span>Logout</span>
          </Link>
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
        props: { user },
      };
    }
  }
);
