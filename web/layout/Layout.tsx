import { ReactNode } from 'react';
import Header from './Header';
import useUser from '@/utils/iron/useUser';
import { HashLoader } from 'react-spinners';
import { useRouter } from 'next/router';

type Props = { userNotRequired?: boolean; children: ReactNode };

export default function Layout({ userNotRequired, children }: Props) {
  const router = useRouter();

  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className='p-6 h-screen'>
        <Header />
        <div
          className='flex items-center justify-center'
          style={{ height: 'calc(100vh - 5rem)' }}
        >
          <HashLoader color='#D0EBAE' />
        </div>
      </div>
    );
  }

  if (userNotRequired) {
    return (
      <div className='p-6'>
        <Header />
        <div className='pt-12'>{children}</div>
      </div>
    );
  }

  if (!user) {
    router.reload();
  }

  return (
    <div className='p-6'>
      <Header />
      <div className='pt-12'>{children}</div>
    </div>
  );
}
