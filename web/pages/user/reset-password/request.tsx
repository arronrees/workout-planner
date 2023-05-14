import { FormButton } from '@/components/form/FormButton';
import { FormInputText } from '@/components/form/FormInput';
import DividerLine from '@/components/general/DividerLine';
import { API_URL } from '@/constants';
import Layout from '@/layout/Layout';
import { withSessionSsr } from '@/utils/iron/withSession';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

type FormInputs = {
  email: string;
};

export default function UpdatePassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);

    const res = await fetch(
      `${API_URL}/api/auth/password/reset?email=${data.email}`,
      { method: 'POST' }
    );
    const responseData = await res.json();

    if (!res.ok) {
      if (responseData.error && typeof responseData.error === 'string') {
        toast.error(responseData.error);
      } else {
        toast.error(
          'There was a problem requesting your password reset, please try again.'
        );
      }

      setIsLoading(false);
      return;
    } else {
      toast.success('You will receive an email shortly');

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
    },
  });

  return (
    <Layout userNotRequired>
      <section>
        <h1 className='font-semibold text-2xl mb-2'>Forgotten Password?</h1>
        <p className='font-light text-sm text-zinc-500'>
          Enter your email below and you will receive an email with instructions
          on how to reset your password.
        </p>
      </section>

      <DividerLine />

      <section>
        <form className='grid gap-4' onSubmit={handleSubmit(handleFormSubmit)}>
          <FormInputText labelText='Email' inputId='email'>
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
            text='Request Password Reset'
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
