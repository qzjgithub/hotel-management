'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

const CaptchaCode = ({value, onChange, email, purpose}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error('Please enter a valid email address');
        return;
      }
      await fetch('/api/auth/code', {
        method: 'POST',
        body: JSON.stringify({
          email,
          purpose
        })
      });
      toast.success('Verification code sent successfully');
    } catch {
      toast.error('Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center gap-5'>
      <input
        className='border flex-1 border-gray-300 sm:text-sm text-black rounded-lg p-2.5 focus:outline-none'
        placeholder='Enter Verification Code'
        required
        name='code'
        value={value}
        onChange={onChange}
        autoComplete='off'
      />
      <button
        type='button'
        className='font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-white shadow-sm flex justify-center focus:outline-none'
        onClick={handleClick}
        disabled={loading}
      >
        {
          loading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null
        }
        Send Code
      </button>
    </div>
  );
};

export default CaptchaCode;
