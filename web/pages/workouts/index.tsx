import DividerLine from '@/components/general/DividerLine';
import WorkoutGrid from '@/components/workouts/WorkoutGrid';
import { User } from '@/constant-types';
import Layout from '@/layout/Layout';
import { withSessionSsr } from '@/utils/iron/withSession';

type PageProps = {
  user: User;
};

export default function UserWorkouts({ user }: PageProps) {
  return (
    <Layout>
      <section>
        <h1 className='page__header__title'>My workouts</h1>
        <p className='page__header__subtitle'>
          Here you can view all of your workouts.
        </p>
      </section>

      <DividerLine />

      <WorkoutGrid />
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
