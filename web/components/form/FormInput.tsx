import { ReactNode } from 'react';

type FormInputTextProps = {
  children: ReactNode;
  labelText: string;
  inputId: string;
  optional?: boolean;
  infoText?: string;
};

export function FormInputText({
  children,
  labelText,
  optional,
  inputId,
  infoText,
}: FormInputTextProps) {
  return (
    <div>
      <label htmlFor={inputId} className='form__label'>
        {labelText}{' '}
        {optional ? (
          <span className='opacity-30 font-normal ml-1'>(optional)</span>
        ) : (
          ''
        )}
      </label>
      {infoText && (
        <span className='block opacity-50 text-xs mb-1'>{infoText}</span>
      )}
      {children}
    </div>
  );
}

type FormInputTextAreaProps = {
  labelText: string;
  inputId: string;
  inputValue?: string;
  optional?: boolean;
  infoText?: string;
  children: ReactNode;
};

export function FormInputTextArea({
  labelText,
  inputId,
  infoText,
  optional,
  children,
}: FormInputTextAreaProps) {
  return (
    <div>
      <label htmlFor={inputId} className='form__label'>
        {labelText}{' '}
        {optional ? (
          <span className='opacity-30 font-normal ml-1'>(optional)</span>
        ) : (
          ''
        )}
      </label>
      {infoText && (
        <span className='block opacity-50 text-xs mb-1'>{infoText}</span>
      )}
      {children}
    </div>
  );
}

type FormInputSelectProps = {
  inputId: string;
  labelText: string;
  optional?: boolean;
  infoText?: string;
  children: ReactNode;
};

export function FormInputSelect({
  inputId,
  labelText,
  optional,
  infoText,
  children,
}: FormInputSelectProps) {
  return (
    <div>
      <label htmlFor={inputId} className='form__label'>
        {labelText}{' '}
        {optional ? (
          <span className='opacity-30 font-normal ml-1'>(optional)</span>
        ) : (
          ''
        )}
      </label>
      {infoText && (
        <span className='block opacity-50 text-xs mb-1'>{infoText}</span>
      )}
      <div className='relative'>
        {children}
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
