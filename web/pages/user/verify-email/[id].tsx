import { User } from '@/constant-types';
import Layout from '@/layout/Layout';
import { withSessionSsr } from '@/utils/iron/withSession';

type PageProps = {
  success: boolean;
  user?: User;
};

export default function UserVerifyEmail({ success, user }: PageProps) {
  return (
    <Layout userNotRequired>
      <div className='mb-6'>
        <h1 className='font-extralight text-4xl mb-2'>
          Hello{user && `, ${user.name}`}
        </h1>
        {success ? (
          <p className='font-semibold text-zinc-500'>
            Thank you for verifying your email address
          </p>
        ) : (
          <p className='font-semibold text-zinc-500'>
            We were unable to verify your email at this time, please try again
            later
          </p>
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, res, params, query }) {
    const user = req.session.user;

    const { id } = params!;
    const { token } = query;

    if (!id || !token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/email/verify/${id}/${token}`,
      { method: 'POST' }
    );

    if (response.ok) {
      return {
        props: { success: true, user: user ? user : null },
      };
    } else {
      return {
        props: { success: false, user: user ? user : null },
      };
    }
  }
);
