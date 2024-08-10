'use client';

import React, { FC, useState } from 'react';
import { HiMapPin } from "react-icons/hi2";
import { MdOutlineDateRange } from "react-icons/md";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { HeroInput } from './HeroInput';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { CiSearch } from "react-icons/ci";
import { useRouter } from 'next/navigation';

dayjs.extend(advancedFormat);

type Props = {
  heading1: React.ReactNode;
  section2: React.ReactNode;
};

const ClientComponent: FC<Props> = props => {
  const { heading1, section2 } = props;
  const [searchParam, setSearchParam] = useState<{place: string | null, checkinDate: Date | null}>({
    place: '',
    checkinDate: new Date()
  });

  
  const router = useRouter();

  return (
    <section className='flex px-4 items-center gap-12 container mx-auto'>
      <div className='py-10 h-full'>
        {heading1}

        <div className='flex bg-white pl-6 pr-4 py-3 w-fit rounded-full items-stretch'>
          <HeroInput
            label='Destination'
            icon={<HiMapPin />}
            element={
              <input
                className='w-36'
                placeholder='Center Point'
                onChange={(e) => setSearchParam({...searchParam, place: e.target.value})}
              />
            }
          />
          <p className='border-r-2 border-solid border-[#eeeef0] mx-8' />
          <HeroInput
            label='Date'
            icon={<MdOutlineDateRange />}
            element={
              <DatePicker
                selected={searchParam.checkinDate}
                dateFormat='do,MMM,YYYY'
                onChange={(d: Date | null) => setSearchParam({...searchParam, checkinDate: d})}
                minDate={new Date()}
                id='check-in-date'
                className='w-36'
              />
            }
          />
          <div className='flex items-center ml-8'>
            <button
              className='h-10 w-10 rounded-full bg-[#e2794d] text-white flex justify-center items-center'
              onClick={() => router.push(`/rooms?place=${searchParam.place}&checkinDate=${searchParam.checkinDate?.toISOString()}`)}
            >
              <CiSearch className='text-xl' />
            </button>
          </div>
        </div>
      </div>

      {section2}
    </section>
  );
};

export default ClientComponent;
