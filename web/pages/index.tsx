import Layout from '@/layout/Layout';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import HashLoader from 'react-spinners/HashLoader';

export default function Home() {
  const { user, isLoading, error } = useUser();

  const router = useRouter();

  if (error) {
    return (
      <Layout>
        <p>
          An error occurred loading the application, please try again later.
        </p>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen p-4'>
        <HashLoader color='#D0EBAE' />
      </div>
    );
  }

  if (user) {
    router.push('/dashboard');
  }

  return (
    <Layout>
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
        <p className='font-semibold text-center mb-16 text-grey'>
          Sign up to get started tracking your workouts and reaching your goals
        </p>
        <a href='/api/auth/login' className='btn btn--green btn--primary'>
          Sign In
        </a>
      </section>
    </Layout>
  );
}
