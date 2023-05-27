import DividerLine from '@/components/general/DividerLine';
import UpdateUserDetailsForm from '@/components/user/UpdateUserDetailsForm';
import UpdateUserProfileImageForm from '@/components/user/UpdateUserProfileImageForm';
import { User } from '@/constant-types';
import Layout from '@/layout/Layout';
import { withSessionSsr } from '@/utils/iron/withSession';

type PageProps = {
  user: User;
};

export default function UpdateMyDetails({ user }: PageProps) {
  return (
    <Layout>
      <section className='flex justify-between gap-4 items-end'>
        <div>
          <h1 className='page__header__title'>Update My Details</h1>
          <p className='page__header__subtitle'>Update your details</p>
        </div>
        <UpdateUserProfileImageForm user={user} />
      </section>

      <DividerLine />

      <section>
        <UpdateUserDetailsForm user={user} />
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
