import { Dialog, Transition } from '@headlessui/react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Fragment, useState } from 'react';
import NewProgressionForm from './NewProgressionForm';
import { Exercise } from '@/constant-types';

type Props = {
  exercise: Exercise;
};

export default function NewProgressionModal({ exercise }: Props) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className='col-span-3 py-2'>
        <button
          type='button'
          onClick={openModal}
          className='w-full p-2 border border-gray-100 rounded text-xs flex justify-start items-center gap-4 relative text-gray-400 hover:text-gray-700 focus:text-gray-700 hover:border-gray-300 focus:border-gray-300 transition duration-150'
        >
          <PlusIcon className='w-4 h-4' />
          <span>Add progress</span>
        </button>
      </div>

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

                  <div className='mt-2'>
                    <h3 className='mb-4'>Add new progression</h3>
                    <NewProgressionForm
                      exerciseId={exercise.id}
                      closeModal={closeModal}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
