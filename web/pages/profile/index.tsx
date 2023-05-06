import Layout from '@/layout/Layout';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';

type Props = {
  user: UserProfile;
};

export default function Profile({ user }: Props) {
  console.log(user);

  return (
    <Layout>
      <div className='mb-6'>
        <h1 className='font-extralight text-4xl mb-2'>
          Hello, {user.name?.split(' ')[0]}
        </h1>
        <p className='font-semibold text-grey'>
          View and update your information
        </p>
      </div>
      <div>
        <a href='/api/auth/logout' className='btn btn--red'>
          Logout
        </a>
      </div>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired();
