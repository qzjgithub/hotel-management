'use client'

import { Dropdown } from "@/components/Dropdown/Dropdown";
import { SearchInput } from "@/components/SearchInput/SearchInput";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineDateRange } from "react-icons/md";

type SearchControllerProps = {
  onSearch?: Function
}

export type SearchParamType = {
  place?: string | null,
  minDuration?: number | null,
  maxDuration?: number | null,
  name?: string | null
}

export const SearchController = ({onSearch}: SearchControllerProps) => {
  const [searchParam, setSearchParam] = useState<SearchParamType>({
    minDuration: 1
  });

  const currentMin = searchParam.minDuration || 1;

  return (
    <div className="flex justify-between bg-white rounded-xl px-6 py-4 items-end flex-wrap">
      <SearchInput
        label="WHERE"
        icon={null}
        element={
          <input
            placeholder="Where"
            className="w-32"
            onChange={e => setSearchParam({...searchParam, place: e.target.value})}
          />
        }
      />
      <SearchInput
        label="MIN VISIT TIME"
        icon={null}
        element={
          <Dropdown
            className='w-32'
            panelClassName='-left-[0.65rem] top-[2.05rem]'
            placeholder={'Min visit time'}
            options={Array.from({length: searchParam.maxDuration || 8}).map((_, i) => ({label: `${i + 1}H`, value: i + 1}))}
            onChange={(v: string) => setSearchParam({...searchParam, minDuration: v ? Number(v) : undefined})}
          />
        }
      />
      <SearchInput
        label="MAX VISIT TIME"
        icon={null}
        element={
          <Dropdown
            className='w-32'
            panelClassName='-left-[0.65rem] top-[2.05rem]'
            placeholder={'Max visit time'}
            options={Array.from({length: 8 - currentMin + 1}).map((_, i) => ({label: `${i + currentMin}H`, value: i + currentMin}))}
            onChange={(v: string) => setSearchParam({...searchParam, maxDuration: v ? Number(v) : undefined})}
          />
        }
      />
      <SearchInput
        label="HOTEL NAME"
        icon={null}
        element={
          <input
            placeholder="hotel name"
            className="w-32"
            onChange={e => setSearchParam({...searchParam, name: e.target.value})}
          />
        }
      />
      <button
        className="py-2 px-4 rounded-full h-10 w-22 bg-red-500 text-white"
        onClick={() => onSearch && onSearch(searchParam)}
      >
        Search
      </button>
    </div>
  );
}