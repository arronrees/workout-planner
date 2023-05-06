import { FormButton } from '@/components/form/FormButton';
import {
  FormInputSelect,
  FormInputText,
  FormInputTextArea,
} from '@/components/form/FormInput';
import { muscleGroups } from '@/constants';
import Layout from '@/layout/Layout';

export default function NewWorkout() {
  return (
    <Layout>
      <div>
        <h1 className='text-2xl mb-1'>New Workout</h1>
        <p className='text-grey text-xs'>Let&apos;s get started</p>
      </div>
      <div className='py-4'>
        <span className='block w-full h-[2px] bg-grey-light'></span>
      </div>
      <section className='grid gap-4'>
        <FormInputText
          inputId='workoutName'
          inputName='workoutName'
          labelText='Name of workout'
        />
        <FormInputText
          inputId='shortDescription'
          inputName='shortDescription'
          labelText='Short description'
          optional
        />
        <FormInputSelect
          inputId='muscleGroupFocus'
          inputName='muscleGroupFocus'
          labelText='Muscle Group Focus'
          options={muscleGroups}
        />
        <FormInputText
          inputId='equipment'
          inputName='equipment'
          labelText='Equipment needed'
          optional
        />
        <FormInputTextArea
          inputId='workoutNotes'
          inputName='workoutNotes'
          labelText='Workout notes'
          optional
        />
        <FormButton text='Create Workout' />
      </section>
    </Layout>
  );
}
