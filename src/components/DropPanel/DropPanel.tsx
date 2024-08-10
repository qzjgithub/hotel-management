'use client'

import { use, useEffect, useRef, useState } from "react";

export const DropPanel = (props: any) => {
  const {open, text, children, className, panelClassName, frameClassName, onOpenChange, ...restProps} = props;
  const ref = useRef<HTMLElement>();
  const [opened, setOpened] = useState(!!open);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (!open && ref.current) {
      ref.current.blur();
    }
    setOpened(open);
  }, [open]);

  useEffect(() => {
    onOpenChange && onOpenChange(opened);
  }, [onOpenChange, opened]);

  return (
    <a href="#"
      ref={ref}
      className={`cursor-pointer relative ${frameClassName || ''}`}
      onFocus={() => setOpened(true)}
      onBlur={() => setOpened(locked ? opened : false)}
      onMouseEnter={() => setLocked(true)}
      onMouseLeave={() => setLocked(false)}
      {...restProps}
    >
      <p className={`min-h-6 min-w-10 ${className}`}>{text}</p>
      <div className={`${opened ? 'block' : 'hidden'} absolute ${panelClassName || ''}`}>
        {children}
      </div>
    </a>
  );
}