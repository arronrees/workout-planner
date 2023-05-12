import Layout from '@/layout/Layout';
import { withSessionSsr } from '@/utils/iron/withSession';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout userNotRequired>
      <div className='h-96 p-8 pt-32'>
        <figure>
          <Image
            src='/register-illustration.svg'
            className='object-contain'
            priority
            fill
            alt=''
          />
        </figure>
      </div>
      <section>
        <h1 className='font-extralight text-4xl text-center mb-4'>
          Let&apos;s get moving
        </h1>
        <p className='font text-center mb-16 text-grey'>
          Sign up to get started tracking your workouts and reaching your goals
        </p>
        <a href='/auth/signup' className='btn btn--green'>
          Register Now
        </a>
        <p className='text-center font-extralight text-sm mt-6'>
          Already have an account?{' '}
          <Link href='/auth/signin' className='font-semibold'>
            Sign In
          </Link>
        </p>
      </section>
    </Layout>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, res }) {
    const user = req.session.user;

    if (user) {
      return {
        redirect: {
          destination: '/dashboard',
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
