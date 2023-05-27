import SignUpForm from '@/components/auth/SignUpForm';
import DividerLine from '@/components/general/DividerLine';
import Layout from '@/layout/Layout';
import { withSessionSsr } from '@/utils/iron/withSession';
import Link from 'next/link';

export default function SignUp() {
  return (
    <Layout userNotRequired>
      <section>
        <h1 className='font-extralight text-4xl text-center mb-4'>
          Let&apos;s get moving
        </h1>
        <p className='font text-center mb-6 text-zinc-500'>
          Sign up to get started tracking your workouts and reaching your goals
        </p>
        <p className='text-center font-extralight text-xs'>
          Already have an account?{' '}
          <Link href='/auth/signin' className='font-semibold'>
            Sign In
          </Link>
        </p>
      </section>

      <DividerLine small />

      <section className='mt-6'>
        <SignUpForm />
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
