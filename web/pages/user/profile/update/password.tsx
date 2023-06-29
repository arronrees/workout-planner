import BackBtn from '@/components/general/BackBtn';
import DividerLine from '@/components/general/DividerLine';
import UpdateUserPasswordForm from '@/components/user/UpdateUserPasswordForm';
import { User } from '@/constant-types';
import Layout from '@/layout/Layout';
import { withSessionSsr } from '@/utils/iron/withSession';

type PageProps = {
  user: User;
};

export default function UpdatePassword({ user }: PageProps) {
  return (
    <Layout>
      <BackBtn text='Back to profile' href='/user/profile' />

      <section>
        <h1 className='page__header__title'>Update password</h1>
        <p className='page__header__subtitle'>
          Update your password to something new
        </p>
      </section>

      <DividerLine />

      <section>
        <UpdateUserPasswordForm />
      </section>
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
