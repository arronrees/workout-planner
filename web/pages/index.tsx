import Layout from '@/layout/Layout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import HashLoader from 'react-spinners/HashLoader';

export default function Home() {
  const router = useRouter();

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
        <a href='/api/auth/login' className='btn btn--green'>
          Sign In
        </a>
      </section>
    </Layout>
  );
}
