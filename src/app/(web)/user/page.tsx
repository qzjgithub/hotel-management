'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react'
import { FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'next-auth/react';
import RightPabel from './RightPanel';
import { User } from '@/models/user';
import LoadingSpinner from '../loading';

const UserDetail = () => {
  const [userData, setUserData] = useState<User>({} as User);

  const [loading, setLoading] = useState(true);

  const fetchUserDetail = async () => {
    try {
      setLoading(true);
      const result = await fetch('/api/users');
      const data = await result.json();
      setUserData(data);
    } catch {
      // do nothing
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserDetail();
  }, []);

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div className='flex-1 container mx-auto px-2 md:px-4 py10'>
      <div className='grid md:grid-cols-12 gap-10'>
        <div className='hidden md:block md:col-span-4 lg:col-span-3 shadow-lg h-fit sticky top-10 bg-[#eff0f2] text-black rounded-lg px-6 py-4'>
          <div className='md:w-[143px] w-28 h-28 md:h-[143px] mx-auto mb-5 rounded-full overflow-hidden'>
            <Image
              src={userData.image || '/images/avatar.png'}
              alt={userData.name || 'User Avatar'}
              width={143}
              height={143}
              className='img scale-animation rounded-full'
            />
          </div>
          <div className='font-normal text-center'>
            <h6 className='text-xl font-bold pb-3'>{userData.name}</h6>
          </div>
          <div className='font-normal py-4 text-left'>
            <h6 className='text-sm font-bold pb-3'>About: </h6>
            <p className='text-sm'>{userData.about ?? '--'}</p>
          </div>
          <div className='flex items-center'>
            <p className='mr-2'>Sign Out</p>
            <span
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <FaSignOutAlt
                className='text-3xl cursor-pointer'
              />
            </span>
          </div>
        </div>
        <div className='md:col-span-8 lg:col-span-9'>
          <div className='flex items-center'>
            <h5 className='text-2xl font-bold mr-3'>Hello, {userData.name}</h5>
          </div>
          <div className='flex items-center gap-3 justify-evenly md:justify-start'>
            <div className='md:hidden w-14 h-14 rounded-l-full overflow-hidden'>
              <Image
                className='img scale-animation rounded-full'
                width={56}
                height={56}
                src={userData.image || '/images/avatar.png'}
                alt='User  Image'
              />
            </div>
            <div>
              <p className='block w-fit md:hidden text-sm py-2'>
                About: {userData.about ?? '--'}
              </p>
              <p className='text-xs py-2 font-medium'>
                Joined In {userData.createdAt?.split('T')[0]}
              </p>
              <div className='md:hidden flex items-center my-2'>
                <p className='mr-2'>Sign out</p>
                <FaSignOutAlt
                  className='text-3xl cursor-pointer'
                  // onClick={() => signOut({ callbackUrl: '/' })}
                />
              </div>
            </div>
          </div>
          <RightPabel />
          
        </div>
      </div>
    </div>
  )
}

export default UserDetail