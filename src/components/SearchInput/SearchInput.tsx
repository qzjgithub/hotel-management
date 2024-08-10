'use client'

import React, { cloneElement, JSXElementConstructor, useState } from 'react';

type SearchInput = {
  label: string;
  icon: any;
  element: React.ReactElement<{
    className: string,
  }, string | JSXElementConstructor<any>>
}

export const SearchInput = (props: SearchInput) => {
  const {label, icon, element} = props;
  return (
    <div>
      <p className={`text-[#d1d5e9] text-sm font-medium pl-4`}>{label}</p>
      <div className='flex items-center relative rounded-full bg-[#f0f0f0] px-4 py-2'>
        {cloneElement(element, {
          className: `bg-[#f0f0f0] 
          text-[#a5a7b1] focus:b-0 focus:outline-none text-md font-bold
          ${element.props.className || ''}`,
        })}
        <span className='text-[#d7d8df] ml-2'>{icon}</span>
      </div>
    </div>
  );
}