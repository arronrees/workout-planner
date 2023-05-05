import { ReactNode } from 'react';
import Header from './Header';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className='p-6'>
      <Header />
      <div className='pt-12'>{children}</div>
    </div>
  );
}
