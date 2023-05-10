type FormButtonProps = {
  text: string;
  btnClass: string;
  className?: string;
};

export function FormButton({ text, btnClass, className }: FormButtonProps) {
  return (
    <div>
      <button
        type='submit'
        className={`btn ${btnClass} block font-bold text-sm w-full ${
          className ? className : ''
        }`}
      >
        {text}
      </button>
    </div>
  );
}
