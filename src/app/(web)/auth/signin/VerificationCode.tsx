import LoadingButton from '@/components/LoadingButton';
import { FormEvent } from 'react';

interface VerificationCodeProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  loading: Boolean;
}

const VerificationCode = ({handleSubmit, loading}: VerificationCodeProps) => {
  return (
    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
      <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl text-center'>
        Verification Code
      </h1>
      <form
        className='space-y-4 md:space-y-6'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          placeholder='Enter verification code'
          className='border border-gray-300 sm:text-sm text-black rounded-lg block w-full p-2.5 focus:outline-none'
          required
          name='code'
          autoComplete='off'
        />
        <LoadingButton
          btnClass='w-full bg-tertiary-dark'
          loading={loading}
        >
          Verify and Sign In
        </LoadingButton>
      </form>
    </div>
  );
};

export default VerificationCode;
