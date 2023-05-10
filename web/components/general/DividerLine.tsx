type Props = {
  small?: boolean;
};

export default function DividerLine({ small }: Props) {
  return (
    <div className={`py-4 ${small ? 'px-10' : ''}`}>
      <span className='block w-full h-[2px] bg-grey-light'></span>
    </div>
  );
}
