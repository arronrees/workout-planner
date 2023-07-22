import { Exercise } from '@/constant-types';
import { Dialog, Transition } from '@headlessui/react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dispatch, Fragment, SetStateAction, useState } from 'react';

export default function NewWorkoutModal({
  setSelectedExercises,
  setAvailableExercises,
  availableExercises,
}: {
  setSelectedExercises: Dispatch<SetStateAction<Exercise[]>>;
  setAvailableExercises: Dispatch<SetStateAction<Exercise[]>>;
  availableExercises: Exercise[] | null;
}) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSetExercise = (
    e: React.MouseEvent<HTMLButtonElement>,
    exerciseId: string
  ) => {
    e.preventDefault();

    if (availableExercises) {
      const selectedExercise = availableExercises.find(
        (exercise) => exercise.id === exerciseId
      );

      if (selectedExercise) {
        // Exercise exists in the availableExercises array, so remove it from there
        const updatedAvailableExercises = availableExercises.filter(
          (exercise) => exercise.id !== exerciseId
        );

        setAvailableExercises(updatedAvailableExercises);
        // Add the exercise to the selectedExercises array
        setSelectedExercises((prevSelectedExercises: Exercise[]) => [
          ...prevSelectedExercises,
          selectedExercise,
        ]);
      }
    }
  };

  return (
    <div>
      <button
        type='button'
        onClick={openModal}
        className='w-full p-4 border border-gray-100 rounded text-xs flex justify-start items-center gap-4 relative text-gray-400 hover:text-gray-700 focus:text-gray-700 hover:border-gray-300 focus:border-gray-300 transition duration-150'
      >
        <PlusIcon className='w-4 h-4' />
        <span>Add exercise</span>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='absolute top-4 right-4 flex items-center justify-center'>
                    <button
                      type='button'
                      className='opacity-50 transition duration-150 hover:opacity-100 focus:opacity-100'
                      onClick={closeModal}
                    >
                      <XMarkIcon className='w-4 h-4' />
                    </button>
                  </div>

                  <div className='mt-2 min-h-[12rem]'>
                    <h3 className='mb-4'>Add exercise to workout</h3>
                    <ul className='max-h-60 overflow-y-scroll flex flex-wrap gap-2'>
                      {availableExercises && availableExercises.length > 0 ? (
                        availableExercises.map((exercise) => (
                          <li key={exercise.id}>
                            <button
                              type='button'
                              className='text-xs w-full font-light p-2 border rounded flex gap-4 justify-between items-center hover:bg-zinc-100 focus:bg-zinc-100'
                              onClick={(e) => handleSetExercise(e, exercise.id)}
                            >
                              <span>{exercise.name}</span>
                              <PlusIcon className='w-4 h-4' />
                            </button>
                          </li>
                        ))
                      ) : (
                        <p className='text-xs font-light'>
                          No exercises remaining
                        </p>
                      )}
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
