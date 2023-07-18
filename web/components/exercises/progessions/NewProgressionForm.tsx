import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FormInputText } from '@/components/form/FormInput';
import { FormButton } from '@/components/form/FormButton';
import { API_URL } from '@/constants';
import useUser from '@/utils/iron/useUser';

type FormInputs = {
  weight: number;
  reps: number;
  sets: number;
};

type FormData = {
  progression: {
    weight: number;
    reps: number;
    sets: number;
  };
};

type Props = {
  exerciseId: string;
  closeModal: () => void;
};

export default function NewProgressionForm({ exerciseId, closeModal }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({});

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (user) {
      setIsLoading(true);

      const formData: FormData = {
        progression: {
          weight: data.weight,
          reps: data.reps,
          sets: data.sets,
        },
      };

      const res = await fetch(
        `${API_URL}/api/exercises/progression/new/${exerciseId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer: ${user.token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const responseData = await res.json();

      if (!res.ok) {
        if (responseData.error && typeof responseData.error === 'string') {
          toast.error(responseData.error);
        } else {
          toast.error('Could not create progression, please try again.');
        }

        setIsLoading(false);
        return;
      } else {
        toast.success('Exercise created successfully');
        setIsLoading(false);
        closeModal();
        router.push(`/exercises/${exerciseId}`);
        return;
      }
    }
  };

  return (
    <form className='form__grid' onSubmit={handleSubmit(handleFormSubmit)}>
      <FormInputText
        labelText={`Weight ${
          user?.UserSettings?.weightUnit &&
          `(${user?.UserSettings?.weightUnit})`
        }`}
        inputId='weight'
      >
        <>
          <input
            type='text'
            id='weight'
            {...register('weight', {
              required: 'Weight is required',
              valueAsNumber: true,
            })}
            className='form__input'
          />
          {errors.weight?.message && (
            <p className='form__error'>{errors.weight?.message}</p>
          )}
        </>
      </FormInputText>
      <FormInputText labelText='Sets' inputId='sets'>
        <>
          <input
            type='text'
            id='sets'
            {...register('sets', {
              required: 'Sets is required',
              valueAsNumber: true,
            })}
            className='form__input'
          />
          {errors.sets?.message && (
            <p className='form__error'>{errors.sets?.message}</p>
          )}
        </>
      </FormInputText>
      <FormInputText labelText='Reps' inputId='reps'>
        <>
          <input
            type='text'
            id='reps'
            {...register('reps', {
              required: 'Reps is required',
              valueAsNumber: true,
            })}
            className='form__input'
          />
          {errors.reps?.message && (
            <p className='form__error'>{errors.reps?.message}</p>
          )}
        </>
      </FormInputText>

      <FormButton
        btnClass='btn--blue'
        text='Add progress'
        disabled={isLoading}
      />
    </form>
  );
}
