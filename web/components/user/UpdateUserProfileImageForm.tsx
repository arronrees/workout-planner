import { User } from '@/constant-types';
import { API_URL } from '@/constants';
import { CameraIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormButton } from '../form/FormButton';
import Image from 'next/image';

type Props = {
  user: User;
};

export default function UpdateUserProfileImageForm({ user }: Props) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  const previewImgRef = useRef<HTMLImageElement>(null);

  const handleProfileImageFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (profileImageFile) {
      setIsLoading(true);
      const formData = new FormData();

      formData.append('profileImageFile', profileImageFile);

      const res = await fetch(`${API_URL}/api/user/update/image`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });
      const responseData = await res.json();

      if (!res.ok) {
        if (responseData.error && typeof responseData.error === 'string') {
          toast.error(responseData.error);
          setIsLoading(false);
          return;
        }
      } else {
        // update user session
        const userRes = await fetch('/api/user/update');
        const userData = await userRes.json();

        if (!userRes.ok) {
          toast.error(userData.error);
          setIsLoading(false);
          return;
        }

        toast.success('Profile image updated successfully');
        setIsLoading(false);
        setPreviewOpen(false);
        return router.push('/user/profile');
      }
    } else {
      setPreviewOpen(false);
      return toast.error('No file selected');
    }
  };

  const handleImagePreviewOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (file) {
        setPreviewOpen(true);
        setProfileImageFile(file);

        if (previewImgRef.current) {
          const imgSrc = URL.createObjectURL(file);

          previewImgRef.current.src = imgSrc;
          previewImgRef.current.style.display = 'block';
        }
      } else {
        setPreviewOpen(false);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleProfileImageFormSubmit}>
        <label htmlFor='profile-image-file' className='cursor-pointer'>
          <figure className='w-12 h-12 rounded-full border-2 border-gray-400 relative'>
            <div className='absolute w-full h-full flex items-center justify-center'>
              <span className='block absolute w-full h-full bg-black opacity-30 z-10'></span>
              <CameraIcon className='w-5 h-5 text-white relative z-20' />
            </div>
            {user.image && (
              <Image
                src={`${API_URL}/${user.image}`}
                width={48}
                height={48}
                alt=''
              />
            )}
          </figure>
          <input
            type='file'
            name='profile-image-file'
            id='profile-image-file'
            className='hidden'
            onChange={handleImagePreviewOnChange}
          />
        </label>
        <div
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-zinc-200 bg-opacity-50 z-40 flex items-center justify-center ${
            previewOpen ? 'block' : '!hidden'
          }`}
        >
          <div className='relative border-2 border-zinc-200 rounded bg-zinc-50 shadow-md w-11/12 h-80 flex items-center justify-center gap-8 flex-col p-6'>
            <button
              type='button'
              className='absolute top-6 right-6'
              onClick={(e) => {
                e.preventDefault();
                setPreviewOpen(false);
              }}
            >
              <XMarkIcon className='w-4 h-4' />
            </button>
            <figure className='w-36 h-36 rounded-full'>
              <Image
                src=''
                alt=''
                className='rounded-full'
                ref={previewImgRef}
                style={{ display: 'none' }}
              />
            </figure>

            <FormButton
              btnClass='btn--green'
              text='Upload Photo'
              disabled={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
