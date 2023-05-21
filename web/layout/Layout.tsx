import { ReactNode } from 'react';
import Header from './Header';
import useUser from '@/utils/iron/useUser';
import { HashLoader } from 'react-spinners';
import { useRouter } from 'next/router';

type LayoutProps = { userNotRequired?: boolean; children: ReactNode };

export default function Layout({ userNotRequired, children }: LayoutProps) {
  const router = useRouter();

  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <Wrapper className='h-screen'>
        <Header />
        <div
          className='flex items-center justify-center'
          style={{ height: 'calc(100vh - 5rem)' }}
        >
          <HashLoader color='#D0EBAE' />
        </div>
      </Wrapper>
    );
  }

  if (userNotRequired) {
    return (
      <Wrapper>
        <Header />
        <div className='pt-12'>{children}</div>
      </Wrapper>
    );
  }

  if (!user) {
    router.reload();
  }

  return (
    <Wrapper>
      <Header />
      <div className='pt-12'>{children}</div>
    </Wrapper>
  );
}

type WrapperProps = {
  className?: string;
  children: ReactNode;
};

export function Wrapper({ className, children }: WrapperProps) {
  return (
    <div className={`p-6 text-sm ${className ? className : ''}`}>
      {children}
    </div>
  );
}
