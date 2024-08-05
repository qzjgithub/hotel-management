'use client'

import { signOut } from "next-auth/react";
import toast from 'react-hot-toast';

const SignOut = () => {
  const logoutHandler = async () => {
    try {
      await signOut();
    } catch (error) {
      toast.error("Something wen't wrong");
    }
  };

  return (
    <div className='w-full h-full flex flex-col gap-4 items-center p-4'>
      <div>
        You are logged in
      </div>
      <button
        onClick={() => logoutHandler()}
      >
        log out
      </button>
    </div>
  )
}

export default SignOut;