import NewExerciseForm from '@/components/exercises/NewExerciseForm';
import DividerLine from '@/components/general/DividerLine';
import { User } from '@/constant-types';
import Layout from '@/layout/Layout';
import { withSessionSsr } from '@/utils/iron/withSession';

type PageProps = {
  user: User;
};

export default function NewExercise({ user }: PageProps) {
  return (
    <Layout>
      <section>
        <h1 className='page__header__title'>Create new exercise</h1>
        <p className='page__header__subtitle'>Let&apos;s get started</p>
      </section>

      <DividerLine />

      <section>
        <NewExerciseForm user={user} />
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
