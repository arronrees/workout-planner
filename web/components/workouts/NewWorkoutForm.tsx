import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { API_URL, equipmentOptions, muscleGroupOptions } from '@/constants';
import { toast } from 'react-hot-toast';
import {
  FormInputSelect,
  FormInputText,
  FormInputTextArea,
} from '../form/FormInput';
import { FormButton } from '../form/FormButton';
import useUser from '@/utils/iron/useUser';
import { Equipment, Exercise, MuscleGroup } from '@/constant-types';
import NewWorkoutModal from './NewWorkoutModal';
import { MinusIcon } from '@heroicons/react/24/outline';

type FormInputs = {
  name: string;
  muscleGroup: MuscleGroup | '';
  equipment: Equipment | '';
  notes?: string;
};

type FormData = {
  workout: {
    name: string;
    muscleGroup: MuscleGroup | '';
    equipment: Equipment | '';
    notes?: string;
    exercises?: string[];
  };
};

export default function NewWorkoutForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([]);

  const router = useRouter();

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetch(`${API_URL}/api/exercises/user`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setAvailableExercises(data.data);
          } else {
            toast.error('Could not load exercises, please try again');
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error('Could not load exercises, please try again');
        });
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      name: '',
      muscleGroup: '',
      equipment: '',
      notes: '',
    },
  });

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (user) {
      setIsLoading(true);

      const formData: FormData = {
        workout: {
          name: data.name,
          muscleGroup: data.muscleGroup,
          equipment: data.equipment,
          notes: data.notes,
          exercises: selectedExercises.map((exercise) => exercise.id),
        },
      };

      const res = await fetch(`${API_URL}/api/workouts/new`, {
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
          toast.error('Could not create workout, please try again.');
        }

        setIsLoading(false);
        return;
      } else {
        toast.success('Workout created successfully');
        setIsLoading(false);
        router.push('/workouts');
        return;
      }
    }
  };

  const handleRemoveExercise = (
    e: React.MouseEvent<HTMLButtonElement>,
    exerciseId: string
  ) => {
    const removedExercise = selectedExercises.find(
      (exercise) => exercise.id === exerciseId
    );

    if (removedExercise) {
      // Exercise exists in the selectedExercises array, so remove it from there
      const updatedSelectedExercises = selectedExercises.filter(
        (exercise) => exercise.id !== exerciseId
      );
      setSelectedExercises(updatedSelectedExercises);
      // Add the exercise back to the availableExercises array
      setAvailableExercises((prevAvailableExercises: Exercise[]) => [
        ...prevAvailableExercises,
        removedExercise,
      ]);
    } else {
      console.log('Exercise not found in the selected list.');
    }
  };

  return (
    <form className='form__grid' onSubmit={handleSubmit(handleFormSubmit)}>
      <FormInputText labelText='Workout Name' inputId='name'>
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

      <div>
        <p className='form__label'>Exercises</p>
        <ul className='grid gap-2'>
          {selectedExercises &&
            selectedExercises.map((exercise) => (
              <li
                key={exercise.id}
                className='text-xs font-light p-2 border border-gray-200 rounded flex justify-between items-center gap-4 bg-zinc-50 last-of-type:mb-2'
              >
                <span>{exercise.name}</span>
                <button
                  type='button'
                  className='p-1'
                  onClick={(e) => handleRemoveExercise(e, exercise.id)}
                >
                  <MinusIcon className='w-4 h-4' />
                </button>
              </li>
            ))}
        </ul>
        <NewWorkoutModal
          setSelectedExercises={setSelectedExercises}
          availableExercises={availableExercises}
          setAvailableExercises={setAvailableExercises}
        />
      </div>

      <FormButton
        btnClass='btn--blue'
        text='Create Exercise'
        disabled={isLoading}
      />
    </form>
  );
}
