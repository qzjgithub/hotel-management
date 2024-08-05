'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const NavigateLoginBtn = () => {
  const router = useRouter();

  const loginHandler = async () => {
    try {
      await signIn();
      router.push('/');
    } catch (error) {
      console.log(error);
      toast.error("Something wen't wrong");
    }
  };

  return (
    <div className='flex gap-4'>
      <button
        onClick={loginHandler}
      >
        login
      </button>
      <Link
        href='/auth'
      >
        <button>
          register
        </button>
      </Link>
    </div>
  );
};

export default NavigateLoginBtn;
