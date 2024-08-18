'use client'
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const PasswordReset = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const inputStyles =
    'border border-gray-300 sm:text-sm text-black rounded-lg block w-full p-2.5 focus:outline-none';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(event.currentTarget);
      const newPassword = formData.get('newPassword') as string;
      const confirmPassword = formData.get('confirmPassword') as string;
      if (newPassword !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      const res = await fetch('/api/auth/modify-password', {
        method: 'POST',
        body: JSON.stringify({ secret: newPassword })
      });
      const data = await res.json();
      if (!data?.success) {
        toast.error(data?.message || 'Something wen\'t wrong');
      } else {
        toast.success('Password has been updated');
        router.push('/user');
      }
    } catch (error: any) {
      toast.error(error?.message || "Something wen't wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full flex justify-center'>
      <div className='container px-4'>
        <div className='flex mb-8 flex-col md:flex-row items-center justify-center'>
          <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl'>
            Log In
          </h1>
        </div>
        <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
          <input
            type='password'
            name='newPassword'
            placeholder='new password'
            required
            minLength={6}
            className={inputStyles}
          />
          <input
            type='password'
            name='confirmPassword'
            placeholder='confirm password'
            required
            minLength={6}
            className={inputStyles}
          />
          <button
            type='submit'
            className='flex justify-center w-full bg-tertiary-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            {
              loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null
            }
            Modify
          </button>
        </form>
      </div>
    </div>
  )
};

export default PasswordReset;
