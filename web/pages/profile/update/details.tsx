import { FormButton } from '@/components/form/FormButton';
import { FormInputText } from '@/components/form/FormInput';
import DividerLine from '@/components/general/DividerLine';
import { User } from '@/constant-types';
import { API_URL } from '@/constants';
import Layout from '@/layout/Layout';
import { withSessionSsr } from '@/utils/iron/withSession';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

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

type PageProps = {
  user: User;
};

export default function UpdateMyDetails({ user }: PageProps) {
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
      toast.success('Updated details successfully');

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
    <Layout>
      <section>
        <h1 className='font-semibold text-2xl mb-2'>Update My Details</h1>
        <p className='font-light text-sm text-zinc-500'>Update your details</p>
      </section>

      <DividerLine />

      <section>
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
        props: { user },
      };
    }
  }
);
