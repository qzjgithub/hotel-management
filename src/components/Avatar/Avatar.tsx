import Image from 'next/image';
import React from 'react';

export const Avatar = ({url, size}: {url: string, size: any}) => {
  return (
    <div className={`h-${size} w-${size} overflow-hidden rounded-full border-2 border-white border-solid`}>
      <Image
        src={url}
        alt=''
        height={100}
        width={100}
        className='img'
      />
    </div>
  )
} 