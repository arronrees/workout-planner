import ExerciseDetails from '@/components/exercises/ExerciseDetails';
import BackBtn from '@/components/general/BackBtn';
import { User } from '@/constant-types';
import { API_URL } from '@/constants';
import Layout from '@/layout/Layout';
import { withSessionSsr } from '@/utils/iron/withSession';

type Props = {
  user: User;
};

export default function ViewExercise({ user }: Props) {
  return (
    <Layout>
      <BackBtn text='Back to exercises' href='/exercises' />

      <ExerciseDetails />
    </Layout>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, res, params }) {
    const user = req.session.user;

    if (!user) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    } else {
      if (!params || !params.id) {
        return {
          redirect: {
            destination: '/exercises',
            permanent: false,
          },
        };
      }

      // check if exercise exists
      try {
        const res = await fetch(`${API_URL}/api/exercises/find/${params.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (res.ok) {
          return {
            props: {
              user,
            },
          };
        } else {
          return {
            redirect: {
              destination: '/exercises',
              permanent: false,
            },
          };
        }
      } catch (err) {
        return {
          redirect: {
            destination: '/exercises',
            permanent: false,
          },
        };
      }
    }
  }
);
