// 'use client';

import Link from 'next/link';
import { getServerSession } from 'next-auth';
import SignOut from '@/components/SignOut/SignOut';
import { Button } from 'antd';

const Home = async () => {
  const session = await getServerSession();
  
  if (session?.user?.name) {
   return <SignOut />
  }

  return (
    <div className='w-full h-full flex flex-col items-center gap-4 p-4'>
      <span>
        尚未登录
      </span>
      <Link href='/auth'>
        <Button
          type='primary'
        >
          登录/注册
        </Button>
      </Link>
    </div>
  );
};

export default Home;
