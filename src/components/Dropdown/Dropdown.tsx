'use client'

import { useMemo, useState } from "react";
import { DropPanel } from "../DropPanel/DropPanel";

type OptionType = {
  label: string,
  value: any
}

export const Dropdown = (props: any) => {
  const {placeholder, selected, options, onChange, className, downClassName, ...restProps} = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selected);
  const text = useMemo(() => {
    const  item = options.find((o: OptionType) => o.value === value);
    return item?.label || undefined;
  }, [value, options]);

  return (
    <DropPanel
      open={open}
      text={text || placeholder}
      onOpenChange={setOpen}
      className={`text-nowrap text-ellipsis ${className}`}
      {...restProps}
    >
      <ul className={`bg-white px-4 w-fit rounded-lg border ${downClassName}`}>
        {options.map((o: OptionType) => (
          <li
            className="border-b last:border-b-0 text-nowrap py-2 hover:opacity-80"
            key={o.value}
            onClick={() => {
              setValue(o.value);
              setOpen(false);
              onChange && onChange(o.value, o);
            }}
          >
            {o.label}
          </li>
        ))}
      </ul>
    </DropPanel>
  );
}