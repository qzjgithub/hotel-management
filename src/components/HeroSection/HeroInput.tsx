import React, { cloneElement, JSXElementConstructor, useState } from 'react';

type HeroInput = {
  label: string;
  icon: any;
  element: React.ReactElement<{
    className: string,
    onFocus: () => void,
    onBlur: () => void
  }, string | JSXElementConstructor<any>>
}

export const HeroInput = (props: HeroInput) => {
  const {label, icon, element} = props;
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <p className={`font-bold ease-in duration-200 ${focused ? 'text-sm' : 'text-lg'}`}>{label}</p>
      <div className='flex items-center relative'>
        {cloneElement(element, {
          className: `
          text-[#a5a7b1] focus:b-0 focus:outline-none ease-in duration-200
          ${focused ? 'text-lg' : 'text-sm'}
          ${element.props.className}`,
          onFocus: () => setFocused(true),
          onBlur: () => setFocused(false)
        })}
        <span className='text-[#e2794d] ml-2'>{icon}</span>
      </div>
    </div>
  );
}