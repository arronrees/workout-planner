import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Props = { text: string; href: string };

export default function BackBtn({ text, href }: Props) {
  return (
    <div>
      <Link href={href} className='back__btn'>
        <span>
          <ArrowLeftCircleIcon className='w-4 h-4' />
        </span>
        <span>{text}</span>
      </Link>
    </div>
  );
}
