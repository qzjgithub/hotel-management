'use client'

import { Button } from 'antd';
import { signOut } from "next-auth/react";
import toast from 'react-hot-toast';

const SignOut = () => {
  const logoutHandler = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
      toast.error("Something wen't wrong");
    }
  };

  return (
    <div className='w-full h-full flex flex-col gap-4 items-center p-4'>
      <div>
        登录成功
      </div>
      <Button
        onClick={() => logoutHandler()}
        type='primary'
      >
        登出
      </Button>
    </div>
  )
}

export default SignOut;