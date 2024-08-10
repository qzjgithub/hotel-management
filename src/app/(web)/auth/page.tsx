'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const defaultFormData = {
  email: '',
  name: '',
  password: '',
};

const Auth = () => {
  const [formData, setFormData] = useState(defaultFormData);

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
    setFormData(defaultFormData);
    if (session?.user?.name) router.push('/');
  }, [router, session]);

  const loginHandler = async () => {
    try {
      await signIn();
      router.push('/');
    } catch (error) {
      console.log(error);
      toast.error("Something wen't wrong");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const result = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      const user = await result.json();
      if (user?.success) {
        toast.success('Success. Will auto login');
        await signIn('credentials', {
          ...formData,
          redirect: true,
          callbackUrl: '/'
        });
      } else {
        toast.error(user?.message || 'Something wen\'t wrong');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className='flex-1 w-full flex justify-center'
    >
      <div className='container'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8 w-80 md:w-[70%] mx-auto'>
          <div className='flex mb-8 flex-col md:flex-row items-center justify-center'>
            <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl'>
              Create an account
            </h1>
          </div>
          <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
            <input
              // type='email'
              name='email'
              placeholder='name@company.com'
              required
              className={inputStyles}
              value={formData.email}
              onChange={handleInputChange}
              autoComplete='off'
            />
            <input
              type='text'
              name='name'
              placeholder='John Doe'
              required
              className={inputStyles}
              value={formData.name}
              onChange={handleInputChange}
              autoComplete='off'
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
              autoComplete='off'
            />

            <button
              type='submit'
              className='flex justify-center w-full bg-tertiary-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              disabled={loading}
            >
              {
                loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null
              }
              Sign Up
            </button>
          </form>
          <button onClick={loginHandler} className='text-blue-700 underline'>
            login
          </button>
        </div>
      </div>
    </section>
  );
};

export default Auth;
