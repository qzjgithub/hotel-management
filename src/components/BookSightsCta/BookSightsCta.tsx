'use client';

import { TimeSlot } from '@/dto/validate/time-slot';
import { Dispatch, FC, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  checkinDate: Date | null;
  setCheckinDate: Dispatch<SetStateAction<Date | null>>;
  timeSlot: string | null;
  setTimeSlot: Dispatch<SetStateAction<string | null>>;
  timeSlots: TimeSlot[];
  setAdults: Dispatch<SetStateAction<number>>;
  setNoOfChildren: Dispatch<SetStateAction<number>>;
  price: number;
  childPrice: number;
  discount: number;
  adults: number;
  noOfChildren: number;
  ticketNotice: string;
  isBooked: boolean;
  handleBookNowClick: () => void;
};

const BookSightsCta: FC<Props> = props => {
  const {
    price,
    childPrice,
    discount,
    ticketNotice,
    checkinDate,
    setCheckinDate,
    timeSlot,
    timeSlots,
    setTimeSlot,
    setAdults,
    setNoOfChildren,
    adults,
    noOfChildren,
    isBooked,
    handleBookNowClick,
  } = props;

  const discountPrice = price - (price / 100) * discount;

  const calcTotalPrice = () => {
    return 0;
  };

  return (
    <div className='px-7 py-6'>
      <h3>
        <span
          className={`${discount ? 'text-gray-400' : ''} font-bold text-xl`}
        >
          $ {price}
        </span>
        {discount ? (
          <span className='font-bold text-xl'>
            {' '}
            | discount {discount}%. Now{' '}
            <span className='text-tertiary-dark'>$ {discountPrice}</span>
          </span>
        ) : (
          ''
        )}
      </h3>
      <h4>
        <span
          className={`font-bold text-xl`}
        >
          $ {childPrice} / child
        </span>
      </h4>

      <div className='w-full border-b-2 border-b-secondary my-2' />

      <h4 className='my-8'>{ticketNotice}</h4>

      <div className='flex'>
        <div className='w-1/2 pr-2'>
          <label
            htmlFor='check-in-date'
            className='block text-sm font-medium text-gray-900 dark:text-gray-400'
          >
            Date
          </label>
          <DatePicker
            selected={checkinDate}
            onChange={date => setCheckinDate(date)}
            dateFormat='dd/MM/yyyy'
            minDate={new Date()}
            id='check-in-date'
            className='w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary'
          />
        </div>
        <div className='w-1/2 pl-2'>
          <label
            htmlFor='time-slot'
            className='block text-sm font-medium text-gray-900 dark:text-gray-400'
          >
            Time Slot
          </label>
          <select
            id='time-slot'
            value={timeSlot || undefined}
            onChange={e => setTimeSlot(e.target.value)}
            className='w-full border border-gray-300 rounded-lg p-2.5'
          >
            {timeSlots.map((timeSlot, i) => (
              <option key={i} value={JSON.stringify(timeSlot)}>
                {timeSlot.startTime} - {timeSlot.endTime}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='flex mt-4'>
        <div className='w-1/2 pr-2'>
          <label
            htmlFor='adults'
            className='block text-sm font-medium text-gray-900 dark:text-gray-400'
          >
            Adults
          </label>
          <input
            type='number'
            id='adults'
            value={adults}
            onChange={e => setAdults(+e.target.value)}
            min={1}
            max={5}
            className='w-full border border-gray-300 rounded-lg p-2.5'
          />
        </div>
        <div className='w-1/2 pl-2'>
          <label
            htmlFor='children'
            className='block text-sm font-medium text-gray-900 dark:text-gray-400'
          >
            Children
          </label>
          <input
            type='number'
            id='children'
            value={noOfChildren}
            onChange={e => setNoOfChildren(+e.target.value)}
            min={0}
            max={3}
            className='w-full border border-gray-300 rounded-lg p-2.5'
          />
        </div>
      </div>

      {calcTotalPrice() > 0 ? (
        <p className='mt-3'>Total Price: $ {calcTotalPrice()}</p>
      ) : (
        <></>
      )}

      <button
        disabled={isBooked}
        onClick={handleBookNowClick}
        className='btn-primary w-full mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed'
      >
        {isBooked ? 'Booked' : 'Book Now'}
      </button>
    </div>
  );
};

export default BookSightsCta;
