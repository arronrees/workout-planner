import { FormButton } from '@/components/form/FormButton';
import { FormInputText } from '@/components/form/FormInput';
import DividerLine from '@/components/general/DividerLine';
import { API_URL } from '@/constants';
import Layout from '@/layout/Layout';
import useUser from '@/utils/iron/useUser';
import { withSessionSsr } from '@/utils/iron/withSession';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

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

export default function UpdatePassword() {
  const { user, isLoading: isUserLoading } = useUser();

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
      toast.success('Updated password successfully');

      setIsLoading(false);
      router.push('/profile');
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
    <Layout>
      <section>
        <h1 className='font-semibold text-2xl mb-2'>Update password</h1>
        <p className='font-light text-sm text-zinc-500'>
          Update your password to something new
        </p>
      </section>

      <DividerLine />

      <section>
        <form className='grid gap-4' onSubmit={handleSubmit(handleFormSubmit)}>
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
                  minLength: {
                    value: 5,
                    message: 'Password must be at least 5 characters',
                  },
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
      </section>
    </Layout>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, res }) {
    const user = req.session.user;

    if (!user) {
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
