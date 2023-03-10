import Layout from '@/layout/Layout';
import Image from 'next/image';

export default function Home() {
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
      <section className='p-4'>
        <h1 className='font-extralight text-4xl text-center mb-4'>
          Let&apos;s get moving
        </h1>
        <p className='font-semibold text-center mb-16 text-grey'>
          Sign up to get started tracking your workouts and reaching your goals
        </p>
        <a
          href='/api/auth/login'
          className='bg-green px-8 py-4 rounded font-bold block text-center'
        >
          Sign In
        </a>
      </section>
    </Layout>
  );
}
