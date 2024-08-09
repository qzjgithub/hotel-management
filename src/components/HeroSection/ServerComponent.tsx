import Image from 'next/image';
import React from 'react';
import { CiMap } from "react-icons/ci";
import { PiMapPinLight } from "react-icons/pi";
import { PiGlobeStand } from "react-icons/pi";
import { HiMapPin } from "react-icons/hi2";
import { Avatar } from '../Avatar/Avatar';

export const heading1 = (
  <>
    <h1 className='font-heading mb-6'>
      <span className='text-[#e2794d]'>Exploring</span> the best place
    </h1>
    <p className='text-[#4a4a4a] dark:text-[#ffffffea] mb-12 max-w-lg'>
      Experience an Exquisite Hotel Immersed in Rich History and Timeless
      Elegance.
    </p>
  </>
);

export const section2 = (
  <div className='relative'>
    <div className='rounded-b-full overflow-hidden h-96 w-72 relative'>
      <div className='absolute rounded-full h-72 w-72 bg-[#f6d77e] bottom-0' />
      <Image
        src='/images/1.png'
        alt='hero-2'  
        width={300}
        height={300}
        className='absolute img bottom-0'
      />
      <CiMap className='absolute top-[5.5rem] left-8 text-[#83817c] scale-x-[2.5] scale-y-150 -rotate-45' />
      <PiMapPinLight className='absolute top-20 left-6 text-[#83817c] scale-[1.4] -rotate-45' />
      <PiGlobeStand className='absolute top-28 right-3 text-[#ddd8c7] scale-[1.8] -rotate-45' />
    </div>
    <div className='absolute h-24 w-[5.6rem] bg-white bottom-4 -left-10 rounded-md'>
      <div className='rounded-t-md overflow-hidden'>
        <Image
          src='/images/hero-1.jpeg'
          alt='hero-1'
          width={100}
          height={100}
          className='h-fit object-contain'
        />
      </div>
      <p className='text-xs text-center mt-2'>Love Travel!</p>
      <ul className='flex justify-center mt-1'>
        <li>
          <Avatar url='/images/hero-2.jpeg' size={6} />
        </li>
        <li className='-ml-1.5'>
          <Avatar url='/images/hero-2.jpeg' size={6} />
        </li>
        <li className='-ml-1.5'>
          <Avatar url='/images/hero-2.jpeg' size={6} />
        </li>
      </ul>
      <div className='bg-white rounded-md absolute top-6 -right-3 flex text-[10px] py-1 px-2 align-middle leading-3'>
        <HiMapPin/>
        <span>India</span>
      </div>
    </div>
  </div>
);
