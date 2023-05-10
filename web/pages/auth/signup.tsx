import { FormButton } from '@/components/form/FormButton';
import { FormInputText } from '@/components/form/FormInput';
import DividerLine from '@/components/general/DividerLine';
import Layout from '@/layout/Layout';
import useUser from '@/utils/iron/useUser';
import Link from 'next/link';
import React, { useState } from 'react';

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
};

export default function NewWorkout() {
  const { user } = useUser();

  console.log('user:', user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: SignUpFormData = {
      name,
      email,
      password,
    };

    console.log(formData);

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: formData }),
    });
    const responseData = await res.json();
    console.log(responseData);
  };

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
        <form className='grid gap-4' onSubmit={handleFormSubmit}>
          <FormInputText
            inputId='name'
            inputName='name'
            labelText='Name'
            type='text'
            inputValue={name}
            onChangeEvent={(e) => setName(e.target.value)}
          />
          <FormInputText
            inputId='email'
            inputName='email'
            labelText='Email'
            type='email'
            inputValue={email}
            onChangeEvent={(e) => setEmail(e.target.value)}
          />
          <FormInputText
            inputId='password'
            inputName='password'
            labelText='Password'
            type='password'
            inputValue={password}
            onChangeEvent={(e) => setPassword(e.target.value)}
          />

          <FormButton text='Sign Up' btnClass='btn--green' />
        </form>
      </section>
    </Layout>
  );
}
