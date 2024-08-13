'use client'

import { Dropdown } from "@/components/Dropdown/Dropdown";
import { SearchInput } from "@/components/SearchInput/SearchInput";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineDateRange } from "react-icons/md";

type SearchControllerProps = {
  place?: string | null,
  checkinDate?: Date | null,
  onSearch?: Function
}

export type SearchParamType = {
  place?: string | null,
  checkinDate?: Date | null,
  checkoutDate?: Date | null,
  numberOfDays?: number | null,
  name?: string | null
}

export const SearchController = ({place, checkinDate, onSearch}: SearchControllerProps) => {
  const [searchParam, setSearchParam] = useState<SearchParamType>({
    place: '',
    checkinDate: new Date(),
    checkoutDate: null
  });

  useEffect(() => {
    setSearchParam({...searchParam, place, checkinDate});
  }, [place, checkinDate]);

  return (
    <div className="flex justify-between bg-white rounded-xl px-6 py-4 items-end flex-wrap">
      <SearchInput
        label="WHERE"
        icon={null}
        element={
          <input
            placeholder="Where"
            className="w-28"
            onChange={e => setSearchParam({...searchParam, place: e.target.value})}
          />
        }
      />
      <SearchInput
        label='CHECK-IN'
        icon={<MdOutlineDateRange />}
        element={
          <DatePicker
            selected={searchParam.checkinDate}
            dateFormat='do,MMM,YYYY'
            placeholderText="Check-in Date"
            onChange={(d: Date | null) => setSearchParam({...searchParam, checkinDate: d || undefined})}
            minDate={new Date()}
            maxDate={searchParam.checkoutDate || undefined}
            id='check-in-date'
            className='w-28'
          />
        }
      />
      <SearchInput
        label='CHECK-OUT'
        icon={<MdOutlineDateRange />}
        element={
          <DatePicker
            selected={searchParam.checkoutDate}
            dateFormat='do,MMM,YYYY'
            placeholderText="Check-out Date"
            onChange={(d: Date | null) => setSearchParam({...searchParam, checkoutDate: d || undefined})}
            minDate={searchParam.checkinDate || new Date()}
            id='check-out-date'
            className='w-28'
          />
        }
      />
      <SearchInput
        label="ROOM & GUESTS"
        icon={null}
        element={
          <Dropdown
            className='w-32'
            panelClassName='-left-[0.65rem] top-[2.05rem]'
            placeholder={'Room & Guest'}
            options={[
              {value: '', label: 'All'},
              {value: '1', label: '1 Room, 1 Adults'},
              {value: '2', label: '1 Room, 2 Adults'},
              {value: '3', label: '1 Room, 3 Adults'}
            ]}
            onChange={(v: string) => setSearchParam({...searchParam, numberOfDays: v ? Number(v) : undefined})}
          />
        }
      />
      <SearchInput
        label="HOTEL NAME"
        icon={null}
        element={
          <input
            placeholder="hotel name"
            className="w-28"
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