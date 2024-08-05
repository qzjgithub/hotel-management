'use client';

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const defaultFormData = {
  email: '',
  name: '',
  password: '',
};

const SignInPage = () => {
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
    if (session?.user?.name) router.push('/');
  }, [router, session]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
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
      toast.error("Something wen't wrong");
    } finally {
      setFormData(defaultFormData);
    }
  };

  return (
    <section
      className='h-full w-full flex items-center justify-center'
    >
      <div className='container'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8 w-80 md:w-[70%] mx-auto'>
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
              type='text'
              name='name'
              placeholder='John Doe'
              required
              className={inputStyles}
              value={formData.name}
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
              className='w-full bg-tertiary-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
