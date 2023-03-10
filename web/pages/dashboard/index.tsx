import Layout from '@/layout/Layout';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';

type Props = {
  user: UserProfile;
};

export default function Dashboard({ user }: Props) {
  console.log(user);

  return (
    <Layout>
      <div>Dashboard</div>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired();
