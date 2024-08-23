'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react'
import { FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'next-auth/react';
import RightPabel from './RightPanel';
import { User } from '@/models/user';
import LoadingSpinner from '../loading';
import PasswordEdit from './PasswordEdit';
import Button from '@/components/Button';
import Link from 'next/link';
import InfoEditModal from '@/components/UserInfoModal/InfoEditModal';
import BackDrop from '@/components/BackDrop/BackDrop';
import { BiSolidEdit } from 'react-icons/bi';
import toast from 'react-hot-toast';

const UserDetail = () => {
  const [userData, setUserData] = useState<User>({} as User);

  const [loading, setLoading] = useState(true);

  const [infoModalVisible, setInfoModalVisible] = useState(false);

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

  const confirmUserInfo = async (text: string) => {
    const res = await fetch('/api/users', {
      method: 'PUT',
      body: JSON.stringify({ about: text }),
    });
    const json = await res.json();
    if (json.success) {
      toast.success('Updated successfully');
      setUserData((prev) => ({ ...prev, about: text }));
    }
  };

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
            <h6 className='text-sm font-bold pb-3 flex items-center gap-2'>
              <span>About: </span>
              <InfoEditBtn onClick={() => setInfoModalVisible(true)} />
            </h6>
            <p
              className='text-sm overflow-hidden text-nowrap text-ellipsis'
              title={userData.about ?? ''}
            >
                {userData.about ?? '--'}
            </p>
          </div>
          <Link
            href='/user/modify-password'
          >
            <PasswordEdit />
          </Link>
          <div
            className='mt-2 flex'
          >
            <Button
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <p className='mr-2'>Sign out</p>
              <FaSignOutAlt
                className='text-xl cursor-pointer'
              />
            </Button>
          </div>
        </div>
        <div className='md:col-span-8 lg:col-span-9'>
          <div className='flex items-center justify-between mb-1'>
            <h5 className='text-2xl font-bold mr-3'>Hello, {userData.name}</h5>
            <Link
              href='/user/modify-password'
              className='md:hidden'
            >
              <PasswordEdit />
            </Link>
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
              <p className='flex items-center gap-1 w-fit md:hidden text-sm py-2'>
                <span>
                  About: {userData.about ?? '--'}
                </span>
                <InfoEditBtn onClick={() => setInfoModalVisible(true)} />
              </p>
              <p className='text-xs py-2 font-medium'>
                Joined In {userData.createdAt?.split('T')[0]}
              </p>
              <div className='md:hidden flex items-center my-2'>
                <Button
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  <p className='mr-2'>Sign out</p>
                  <FaSignOutAlt
                    className='text-3xl cursor-pointer'
                  />
                </Button>
              </div>
            </div>
          </div>
          <RightPabel />
        </div>
      </div>
      <InfoEditModal
        isOpen={infoModalVisible}
        onClose={() => setInfoModalVisible(false)}
        onOk={confirmUserInfo}
        defaultText={userData.about ?? ''}
      />
      <BackDrop
        isOpen={infoModalVisible}
      />
    </div>
  )
}

type InfoEditModalProps = {
  onClick: () => void;
}

const InfoEditBtn = ({onClick}: InfoEditModalProps) => {
  return (
    <div>
      <Button
        onClick={onClick}
      >
        <BiSolidEdit className='text-xl cursor-pointer'/>
      </Button>
    </div>
  );
};

export default UserDetail