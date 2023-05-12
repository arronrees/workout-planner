import { FormButton } from '@/components/form/FormButton';
import { FormInputText } from '@/components/form/FormInput';
import DividerLine from '@/components/general/DividerLine';
import Layout from '@/layout/Layout';
import { withSessionSsr } from '@/utils/iron/withSession';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

type FormData = {
  user: {
    name: string;
    email: string;
    password: string;
  };
};

export default function SignUp() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);

    const formData: FormData = {
      user: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    };

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const responseData = await res.json();

    if (!res.ok) {
      if (responseData.error && typeof responseData.error === 'string') {
        toast.error(responseData.error);
        setIsLoading(false);
        return;
      }
    } else {
      if (responseData.data?.name) {
        toast.success(`Welcome, ${responseData.data.name}`);
      }

      router.push('/');
      setIsLoading(false);
      return;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  return (
    <Layout>
      <section>
        <h1 className='font-extralight text-4xl text-center mb-4'>
          Let&apos;s get moving
        </h1>
        <p className='font text-center mb-6 text-grey'>
          Sign up to get started tracking your workouts and reaching your goals
        </p>
        <p className='text-center font-extralight text-sm'>
          Already have an account?{' '}
          <Link href='/auth/signin' className='font-semibold'>
            Sign In
          </Link>
        </p>
      </section>

      <DividerLine small />

      <section className='mt-8'>
        <form className='grid gap-4' onSubmit={handleSubmit(handleFormSubmit)}>
          <FormInputText labelText='Name' inputId='name'>
            <>
              <input
                type='text'
                id='name'
                {...register('name', { required: 'Name is required' })}
                className='form__input'
              />
              {errors.name?.message && (
                <p className='form__error'>{errors.name?.message}</p>
              )}
            </>
          </FormInputText>
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

          <FormButton
            text='Sign Up'
            btnClass='btn--green'
            disabled={isLoading}
          />
        </form>
      </section>
    </Layout>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, res }) {
    const user = req.session.user;

    if (user) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    } else {
      return {
        props: {},
      };
    }
  }
);
