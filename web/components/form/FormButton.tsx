type FormButtonProps = {
  text: string;
  className?: string;
};

export function FormButton({ text, className }: FormButtonProps) {
  return (
    <div>
      <button
        type='submit'
        className={`btn btn--blue block font-bold text-sm w-full ${
          className ? className : ''
        }`}
      >
        {text}
      </button>
    </div>
  );
}
