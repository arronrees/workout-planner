type FormInputTextProps = {
  labelText: string;
  inputId: string;
  inputName: string;
  inputValue?: string;
};

export function FormInputText({
  labelText,
  inputId,
  inputName,
  inputValue,
}: FormInputTextProps) {
  return (
    <div>
      <label htmlFor={inputId} className='block mb-2 font-bold text-xs'>
        {labelText}
      </label>
      <input
        type='text'
        name={inputName}
        id={inputId}
        value={inputValue}
        className='block rounded border border-grey-light w-full p-4 focus:outline-none ring-offset-2 focus:ring-2 active:ring-2 ring-grey-light/50 bg-grey-light/50'
      />
    </div>
  );
}

type FormInputTextAreaProps = {
  labelText: string;
  inputId: string;
  inputName: string;
  inputValue?: string;
};

export function FormInputTextArea({
  labelText,
  inputId,
  inputName,
  inputValue,
}: FormInputTextAreaProps) {
  return (
    <div>
      <label htmlFor={inputId} className='block mb-2 font-bold text-xs'>
        {labelText}
      </label>
      <textarea
        name={inputName}
        id={inputId}
        value={inputValue}
        className='block h-32 rounded border border-grey-light w-full p-4 focus:outline-none ring-offset-2 focus:ring-2 active:ring-2 ring-grey-light/50 bg-grey-light/50'
      ></textarea>
    </div>
  );
}
