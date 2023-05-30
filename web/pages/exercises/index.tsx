import ExerciseGrid from '@/components/exercises/ExerciseGrid';
import DividerLine from '@/components/general/DividerLine';
import { User } from '@/constant-types';
import Layout from '@/layout/Layout';
import { withSessionSsr } from '@/utils/iron/withSession';

type PageProps = {
  user: User;
};

export default function UserExercises({ user }: PageProps) {
  return (
    <Layout>
      <section>
        <h1 className='page__header__title'>My exercises</h1>
        <p className='page__header__subtitle'>
          Here you can view all of your exercises and set new weight and rep
          targets.
        </p>
      </section>

      <DividerLine />

      <ExerciseGrid />
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
