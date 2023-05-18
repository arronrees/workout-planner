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
  email: string;
  password: string;
};

type FormData = {
  user: {
    email: string;
    password: string;
  };
};

export default function SignIn() {
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
    <Layout userNotRequired>
      <section>
        <h1 className='font-extralight text-4xl text-center mb-4'>
          Keep on moving
        </h1>
        <p className='font text-center mb-6 text-zinc-500'>
          Sign in to keep on reaching your goals
        </p>
        <p className='text-center font-extralight text-sm'>
          Need have an account?{' '}
          <Link href='/auth/signup' className='font-semibold'>
            Sign Up
          </Link>
        </p>
      </section>

      <DividerLine small />

      <section className='mt-8'>
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

          <FormButton
            text='Sign In'
            btnClass='btn--green'
            disabled={isLoading}
          />
        </form>

        <Link
          href='/user/reset-password/request'
          className='block text-center font-semibold text-zinc-400 text-sm mt-6 hover:text-zinc-500 focus:text-zinc-500'
        >
          Forgot your password?
        </Link>
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
