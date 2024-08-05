// 'use client';

import { getServerSession } from 'next-auth';
import SignOut from '@/components/SignOut/SignOut';
import NavigateLoginBtn from '@/components/NavigateLoginBtn';

const Home = async () => {
  const session = await getServerSession();
  
  if (session?.user?.name) {
   return <SignOut />
  }

  return (
    <div className='w-full h-full flex flex-col items-center gap-4 p-4'>
      <span>
        You are not logged in
      </span>
      <NavigateLoginBtn />
    </div>
  );
};

export default Home;
