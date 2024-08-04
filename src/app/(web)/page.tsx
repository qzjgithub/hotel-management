// 'use client';

import Link from 'next/link';
import { getServerSession } from 'next-auth';
import SignOut from '@/components/SignOut/SignOut';

const Home = async () => {
  const session = await getServerSession();
  
  if (session?.user?.name) {
   return <SignOut />
  }

  return (
    <Link href='/auth'>登录/注册</Link>
  );
};

export default Home;
