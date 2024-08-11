'use client';

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import VerificationCode from './VerificationCode';
import Link from 'next/link';

const defaultFormData = {
  email: '',
  name: '',
  password: '',
  code: ''
};

const SignInPage = () => {
  const [formData, setFormData] = useState(defaultFormData);

  const [isChecked, setIsChecked] = useState(false);

  const inputStyles =
    'border border-gray-300 sm:text-sm text-black rounded-lg block w-full p-2.5 focus:outline-none';

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    setIsChecked(false);
    if (session?.user?.name) router.push('/');
  }, [router, session]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const resp = await fetch('/api/auth/check', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      const res = await resp.json();
      if (!res?.success) {
        toast.error(res?.message || 'Something wen\'t wrong');
      } else {
        toast.success('Verification code has been sent to your email，please check');
        setIsChecked(true);
      }
    } catch (error: any) {
      toast.error(error?.message || "Something wen't wrong");
    } finally {
      setLoading(false);
    }
  };

  const confirmSendStep = async(e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const code = (e.target as HTMLFormElement)['code'].value;
      const res = await signIn('credentials', {
        ...formData,
        code,
        redirect: false
      });
      if (!res?.ok) {
        toast.error(res?.error || 'Something wen\'t wrong');
      } else {
        toast.success('Sign in successfully');
      }
    } catch (error: any) {
      toast.error(error?.message || "Something wen't wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className='flex-1 w-full flex justify-center'
    >
      <div className='container'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8 w-80 md:w-[60%] mx-auto'>
          {
            isChecked ? (
              <VerificationCode
                loading={loading}
                handleSubmit={confirmSendStep}
              />
            ) : (
              <>
                <div className='flex mb-8 flex-col md:flex-row items-center justify-center'>
                  <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl'>
                    Log In
                  </h1>
                </div>
                <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                  <input
                    type='email'
                    name='email'
                    placeholder='name@company.com'
                    required
                    className={inputStyles}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <input
                    type='password'
                    name='password'
                    placeholder='password'
                    required
                    minLength={6}
                    className={inputStyles}
                    value={formData.password}
                    onChange={handleInputChange}
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
                    Sign In
                  </button>
                  <div className='text-right'>
                    <Link
                      href='/auth'
                      className='text-blue-700 underline'
                    >
                      sign up
                    </Link>
                  </div>
                </form>
              </>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
