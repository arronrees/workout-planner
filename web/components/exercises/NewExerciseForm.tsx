import { useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { API_URL, equipmentOptions, muscleGroupOptions } from '@/constants';
import { User } from '@/constant-types';
import { toast } from 'react-hot-toast';
import {
  FormInputSelect,
  FormInputText,
  FormInputTextArea,
} from '../form/FormInput';
import { FormButton } from '../form/FormButton';

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

type Props = {
  user: User;
};

export default function NewExerciseForm({ user }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);

    const formData: FormData = {
      exercise: {
        name: data.name,
        muscleGroup: data.muscleGroup,
        equipment: data.equipment,
        notes: data.notes,
      },
    };

    const res = await fetch(`${API_URL}/api/exercises/new`, {
      method: 'POST',
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
      toast.success('Exercise created successfully');
      setIsLoading(false);
      router.push('/exercises');
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
      muscleGroup: 'Chest',
      equipment: 'Full',
      notes: '',
    },
  });

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
        btnClass='btn--blue'
        text='Create Exercise'
        disabled={isLoading}
      />
    </form>
  );
}
