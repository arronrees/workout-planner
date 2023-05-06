import Layout from '@/layout/Layout';

export default function Profile() {
  return (
    <Layout>
      <div className='mb-6'>
        <h1 className='font-extralight text-4xl mb-2'>Hello,</h1>
        <p className='font-semibold text-grey'>
          View and update your information
        </p>
      </div>
      <div>
        <a href='/api/auth/logout' className='btn btn--red'>
          Logout
        </a>
      </div>
    </Layout>
  );
}
