import NewExerciseForm from '@/components/exercises/NewExerciseForm';
import BackBtn from '@/components/general/BackBtn';
import DividerLine from '@/components/general/DividerLine';
import NewWorkoutForm from '@/components/workouts/NewWorkoutForm';
import { User } from '@/constant-types';
import Layout from '@/layout/Layout';
import { withSessionSsr } from '@/utils/iron/withSession';

type PageProps = {
  user: User;
};

export default function NewWorkout({ user }: PageProps) {
  return (
    <Layout>
      <BackBtn text='Back to workouts' href='/workouts' />

      <section>
        <h1 className='page__header__title'>Create new workout</h1>
        <p className='page__header__subtitle'>Let&apos;s get started</p>
      </section>

      <DividerLine />

      <section>
        <NewWorkoutForm />
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
