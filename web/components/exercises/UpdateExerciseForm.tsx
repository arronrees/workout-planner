import {
  FormInputSelect,
  FormInputText,
  FormInputTextArea,
} from '../form/FormInput';
import { API_URL, equipmentOptions, muscleGroupOptions } from '@/constants';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormButton } from '../form/FormButton';
import useUser from '@/utils/iron/useUser';
import { Exercise } from '@/constant-types';
import LoadingSpinner from '../general/LoadingSpinner';

type FormInputs = {
  name: string;
  muscleGroup:
    | 'Chest'
    | 'Shoulder'
    | 'Back'
    | 'Bicep'
    | 'Tricep'
    | 'Quad'
    | 'Hamstring'
    | 'Calf'
    | 'Glute';
  equipment: 'Full' | 'Basic' | 'None';
  notes?: string;
};

type FormData = {
  exercise: {
    name: string;
    muscleGroup:
      | 'Chest'
      | 'Shoulder'
      | 'Back'
      | 'Bicep'
      | 'Tricep'
      | 'Quad'
      | 'Hamstring'
      | 'Calf'
      | 'Glute';
    equipment: 'Full' | 'Basic' | 'None';
    notes?: string;
  };
};

export default function UpdateExerciseForm() {
  const { user, isLoading: isUserLoading } = useUser();

  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [exercise, setExercise] = useState<Exercise | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      name: '',
      muscleGroup: 'Chest',
      equipment: 'Full',
      notes: '',
    },
  });

  useEffect(() => {
    if (user) {
      fetch(`${API_URL}/api/exercises/get/${router.query.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setValue('name', data.data.name);
            setValue('muscleGroup', data.data.muscleGroup);
            setValue('equipment', data.data.equipment);
            setValue('notes', data.data.notes);

            setExercise(data.data);
            setIsDataLoading(false);
          } else {
            toast.error('Could not get exercise details, please try again');
            router.push(`/exercises/${router.query.id}`);
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error('Could not get exercise details, please try again');
          router.push(`/exercises/${router.query.id}`);
        });
    }
  }, [user, router, setValue]);

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (exercise && user) {
      setIsLoading(true);

      const formData: FormData = {
        exercise: {
          name: data.name,
          muscleGroup: data.muscleGroup,
          equipment: data.equipment,
          notes: data.notes,
        },
      };

      const res = await fetch(
        `${API_URL}/api/exercises/update/${exercise.id}`,
        {
          method: 'PUT',
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
          toast.error('Could not update details, please try again.');
        }

        setIsLoading(false);
        return;
      } else {
        toast.success('Exercise updated successfully');
        setIsLoading(false);
        router.push(`/exercises/${router.query.id}`);
        return;
      }
    } else {
      toast.error('Could not update details, please try again.');
    }
  };

  if (isUserLoading || isDataLoading) {
    return <LoadingSpinner />;
  }

  return (
    <form className='form__grid' onSubmit={handleSubmit(handleFormSubmit)}>
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
      <FormInputSelect inputId='muscleGroup' labelText='Muscle Group Focus'>
        <select
          id='muscleGroup'
          className='form__input'
          defaultValue='default'
          {...register('muscleGroup', { required: 'Muscle Group is Required' })}
        >
          {muscleGroupOptions.map((option) => (
            <option value={option.value} key={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </FormInputSelect>
      <FormInputSelect inputId='equipment' labelText='Equipment'>
        <select
          id='equipment'
          className='form__input'
          defaultValue='default'
          {...register('equipment', { required: 'Equipment is required' })}
        >
          {equipmentOptions.map((option) => (
            <option value={option.value} key={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </FormInputSelect>
      <FormInputTextArea labelText='Notes' inputId='notes'>
        <>
          <textarea
            id='notes'
            {...register('notes')}
            className='form__input'
          ></textarea>
          {errors.notes?.message && (
            <p className='form__error'>{errors.notes?.message}</p>
          )}
        </>
      </FormInputTextArea>

      <FormButton
        btnClass='btn--amber'
        text='Update Exercise'
        disabled={isLoading}
      />
    </form>
  );
}
