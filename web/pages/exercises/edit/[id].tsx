import DividerLine from '@/components/general/DividerLine';
import { API_URL } from '@/constants';
import Layout from '@/layout/Layout';
import { withSessionSsr } from '@/utils/iron/withSession';

export default function EditExercise() {
  return (
    <Layout>
      <section>
        <h1 className='page__header__title'>Update Exercise</h1>
        <p className='page__header__subtitle'>
          Here you can update this exercise
        </p>
      </section>

      <DividerLine />
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
