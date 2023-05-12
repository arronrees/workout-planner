type FormButtonProps = {
  text: string;
  btnClass: string;
  className?: string;
  disabled?: boolean;
};

export function FormButton({
  text,
  btnClass,
  className,
  disabled,
}: FormButtonProps) {
  return (
    <div>
      <button
        type='submit'
        className={`btn ${btnClass} block font-bold text-sm w-full ${
          className ? className : ''
        }`}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
}
