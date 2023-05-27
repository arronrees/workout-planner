import SignInForm from '@/components/auth/SignInForm';
import DividerLine from '@/components/general/DividerLine';
import Layout from '@/layout/Layout';
import { withSessionSsr } from '@/utils/iron/withSession';
import Link from 'next/link';

export default function SignIn() {
  return (
    <Layout userNotRequired>
      <section>
        <h1 className='font-extralight text-4xl text-center mb-4'>
          Keep on moving
        </h1>
        <p className='font text-center mb-6 text-zinc-500'>
          Sign in to keep on reaching your goals
        </p>
        <p className='text-center font-extralight text-xs'>
          Don&apos;t have an account?{' '}
          <Link href='/auth/signup' className='font-semibold'>
            Sign Up
          </Link>
        </p>
      </section>

      <DividerLine small />

      <section className='mt-6'>
        <SignInForm />

        <Link
          href='/auth/user/reset-password/request'
          className='block text-center font-semibold text-zinc-400 text-xs mt-6 hover:text-zinc-500 focus:text-zinc-500'
        >
          Forgot your password?
        </Link>
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
