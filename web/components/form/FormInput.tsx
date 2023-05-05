type FormInputTextProps = {
  labelText: string;
  inputId: string;
  inputName: string;
  inputValue?: string;
  optional?: boolean;
};

export function FormInputText({
  labelText,
  inputId,
  inputName,
  inputValue,
  optional,
}: FormInputTextProps) {
  return (
    <div>
      <label htmlFor={inputId} className='block mb-2 font-bold text-xs'>
        {labelText}{' '}
        {optional ? (
          <span className='opacity-30 font-normal ml-1'>(optional)</span>
        ) : (
          ''
        )}
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
  optional?: boolean;
};

export function FormInputTextArea({
  labelText,
  inputId,
  inputName,
  inputValue,
  optional,
}: FormInputTextAreaProps) {
  return (
    <div>
      <label htmlFor={inputId} className='block mb-2 font-bold text-xs'>
        {labelText}{' '}
        {optional ? (
          <span className='opacity-30 font-normal ml-1'>(optional)</span>
        ) : (
          ''
        )}
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

type FormInputSelectProps = {
  inputId: string;
  inputName: string;
  labelText: string;
  options: {
    id: string | number;
    value: string | number;
    name: string;
  }[];
  optional?: boolean;
};

export function FormInputSelect({
  inputId,
  inputName,
  labelText,
  options,
  optional,
}: FormInputSelectProps) {
  return (
    <div>
      <label htmlFor={inputId} className='block mb-2 font-bold text-xs'>
        {labelText}{' '}
        {optional ? (
          <span className='opacity-30 font-normal ml-1'>(optional)</span>
        ) : (
          ''
        )}
      </label>
      <div className='relative'>
        <select
          name={inputName}
          id={inputId}
          className='block rounded border border-grey-light w-full p-4 focus:outline-none ring-offset-2 focus:ring-2 active:ring-2 ring-grey-light/50 bg-grey-light/50 appearance-none text-base'
          defaultValue='default'
        >
          <option value='default' disabled>
            Select
          </option>
          {options.map((option) => (
            <option value={option.value} key={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4 absolute top-1/2 -translate-y-1/2 right-4 opacity-60'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 8.25l-7.5 7.5-7.5-7.5'
          />
        </svg>
      </div>
    </div>
  );
}
