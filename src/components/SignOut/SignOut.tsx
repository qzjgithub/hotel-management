'use client'

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

  return <button onClick={() => logoutHandler()}>登出</button>
}

export default SignOut;