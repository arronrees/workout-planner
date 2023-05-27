import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FormInputText } from '../form/FormInput';
import { FormButton } from '../form/FormButton';

type FormInputs = {
  email: string;
  password: string;
};

type FormData = {
  user: {
    email: string;
    password: string;
  };
};

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);

    const formData: FormData = {
      user: {
        email: data.email,
        password: data.password,
      },
    };

    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const responseData = await res.json();

    if (!res.ok) {
      if (responseData.error && typeof responseData.error === 'string') {
        toast.error(responseData.error);
      }

      setIsLoading(false);
      return;
    } else {
      if (responseData.data?.name) {
        toast.success(`Welcome, ${responseData.data.name}`);
      }

      setIsLoading(false);
      router.push('/');
      return;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form className='form__grid' onSubmit={handleSubmit(handleFormSubmit)}>
      <FormInputText labelText='Email' inputId='email'>
        <>
          <input
            type='email'
            id='email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email is not valid',
              },
            })}
            className='form__input'
          />
          {errors.email?.message && (
            <p className='form__error'>{errors.email?.message}</p>
          )}
        </>
      </FormInputText>
      <FormInputText labelText='Password' inputId='password'>
        <>
          <input
            type='password'
            id='password'
            {...register('password', {
              required: 'Password is required',
            })}
            className='form__input'
          />
          {errors.password?.message && (
            <p className='form__error'>{errors.password?.message}</p>
          )}
        </>
      </FormInputText>

      <FormButton text='Sign In' btnClass='btn--green' disabled={isLoading} />
    </form>
  );
}
