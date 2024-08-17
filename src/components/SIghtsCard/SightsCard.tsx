'use client'

import { FC } from 'react';
import Image from 'next/image';

import Link from 'next/link';
import { Sights } from '@/models/sights';

type Props = {
  sight: Sights;
};

const SightsCard: FC<Props> = props => {
  const {
    sight: { coverImage, name, price, duration, description = '', slug, },
  } = props;

  const isBooked = false;

  return (
    <div className='rounded-xl w-72 mb-10 mx-auto md:mx-0 overflow-hidden text-black'>
      <div className='h-60 overflow-hidden'>
        <Image
          src={coverImage}
          alt={name}
          width={250}
          height={250}
          className='img scale-animation'
        />
      </div>

      <div className='p-4 bg-white text-left'>
        <div className='flex justify-between text-xl font-semibold'>
          <p>{name}</p>
          <p>$ {price}</p>
        </div>

        <p className='pt-2 text-xs'>{duration} H</p>

        <p className='pt-3 pb-6'>{description.slice(1, 100)}...</p>

        <Link
          href={`/rooms/${slug}`}
          className='bg-primary inline-block text-center w-full py-4 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500'
        >
          {isBooked ? 'BOOKED' : 'BOOK NOW'}
        </Link>
      </div>
    </div>
  );
};

export default SightsCard;
