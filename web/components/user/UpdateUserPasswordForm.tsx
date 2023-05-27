import { User } from '@/constant-types';
import { FormButton } from '../form/FormButton';
import { FormInputText } from '../form/FormInput';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { API_URL } from '@/constants';

type FormInputs = {
  password: string;
  passwordConfirmation: string;
};

type FormData = {
  user: {
    password: string;
    passwordConfirmation: string;
  };
};

type Props = {
  user: User;
};

export default function UpdateUserPasswordForm({ user }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);

    const formData: FormData = {
      user: {
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      },
    };

    const res = await fetch(`${API_URL}/api/user/update/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer: ${user.token}`,
      },
      body: JSON.stringify(formData),
    });
    const responseData = await res.json();

    if (!res.ok) {
      if (responseData.error && typeof responseData.error === 'string') {
        toast.error(responseData.error);
      } else {
        toast.error('Could not update password, please try again.');
      }

      setIsLoading(false);
      return;
    } else {
      // update user session
      const userRes = await fetch('/api/user/update');
      const userData = await userRes.json();

      if (!userRes.ok) {
        setIsLoading(false);
        toast.error(userData.error);
        return;
      }

      toast.success('Updated password successfully');
      setIsLoading(false);
      router.push('/user/profile');
      return;
    }
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  });

  return (
    <form className='form__grid' onSubmit={handleSubmit(handleFormSubmit)}>
      <FormInputText labelText='New Password' inputId='password'>
        <>
          <input
            type='password'
            id='password'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 5,
                message: 'Password must be at least 5 characters',
              },
            })}
            className='form__input'
          />
          {errors.password?.message && (
            <p className='form__error'>{errors.password?.message}</p>
          )}
        </>
      </FormInputText>
      <FormInputText
        labelText='New Password Confirmation'
        inputId='passwordConfirmation'
      >
        <>
          <input
            type='password'
            id='passwordConfirmation'
            {...register('passwordConfirmation', {
              required: 'Password Confirmation is required',
              validate: (value) =>
                value === getValues('password') || 'Passwords do not match',
            })}
            className='form__input'
          />
          {errors.passwordConfirmation?.message && (
            <p className='form__error'>
              {errors.passwordConfirmation?.message}
            </p>
          )}
        </>
      </FormInputText>

      <FormButton
        text='Update Password'
        btnClass='btn--green'
        disabled={isLoading}
      />
    </form>
  );
}
