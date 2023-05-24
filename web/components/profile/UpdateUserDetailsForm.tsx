import { toast } from 'react-hot-toast';
import { FormButton } from '../form/FormButton';
import { FormInputText } from '../form/FormInput';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { API_URL } from '@/constants';
import { User } from '@/constant-types';

type FormInputs = {
  name: string;
  email: string;
};

type FormData = {
  user: {
    name: string;
    email: string;
  };
};

type Props = {
  user: User;
};

export default function UpdateUserDetailsForm({ user }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);

    const formData: FormData = {
      user: {
        name: data.name,
        email: data.email,
      },
    };

    const res = await fetch(`${API_URL}/api/user/update/details`, {
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
        toast.error('Could not update details, please try again.');
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

      toast.success('User details updated successfully');
      setIsLoading(false);
      router.push('/profile');
      return;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  return (
    <form className='form__grid' onSubmit={handleSubmit(handleFormSubmit)}>
      <FormInputText labelText='Name' inputId='name'>
        <>
          <input
            type='text'
            id='name'
            {...register('name', {
              required: 'Name is required',
            })}
            className='form__input'
          />
          {errors.name?.message && (
            <p className='form__error'>{errors.name?.message}</p>
          )}
        </>
      </FormInputText>
      <FormInputText
        labelText='Email'
        inputId='email'
        infoText='You will have to re-verify your email address if you change this'
      >
        <>
          <input
            type='email'
            id='email'
            {...register('email', {
              required: 'Email is required',
            })}
            className='form__input'
          />
          {errors.email?.message && (
            <p className='form__error'>{errors.email?.message}</p>
          )}
        </>
      </FormInputText>

      <FormButton
        text='Update Details'
        btnClass='btn--green'
        disabled={isLoading}
      />
    </form>
  );
}
