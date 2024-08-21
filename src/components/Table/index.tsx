'use client';

import { Dispatch, FC, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

import { Booking } from '@/models/booking';
import dayjs from 'dayjs';

type Props = {
  bookingDetails: Booking[];
  setBookingId: Dispatch<SetStateAction<string | null>>;
  toggleRatingModal: () => void;
};

const Table: FC<Props> = ({ bookingDetails, setBookingId, toggleRatingModal }) => {
  const router = useRouter();

  const generateMainContent = () => {
    if (!bookingDetails || !bookingDetails.length) {
      return (
        <tr className='text-center p-4'>
          <td className='text-gray-500 p-4' colSpan={7}>No booking found</td>
        </tr>
      );
    }

    return bookingDetails.map(booking => {
      const startDate = dayjs(booking.checkinDate).format('DD MMM, YYYY');
      return (
        <tr
          key={booking.id}
          className='bg-white border-b hover:bg-gray-50'
        >
          <td className='px-4 py-4'>
            {
              booking?.hotelRoom?.name || booking?.sights?.name || ''
            }
          </td>
          <th
            onClick={() => {
              if (booking.hotelRoom) {
                router.push(`/rooms/${booking.hotelRoom.slug}`);
              } else if (booking.sights) {
                router.push(`/places/${booking.sights.slug}`);
              }
            }
            }
            className='px-4 underline text-blue-600 cursor-pointer py-4 font-medium whitespace-nowrap'
          >
            {booking.id}
          </th>
          <td className='px-4 py-4'>
            {
              booking.hotelRoom ? 'Hotel' : 'Sights'
            }
          </td>
          <td className='px-4 py-4'>Booked</td>
          <td className='px-4 py-4'>{booking.totalPrice}</td>
          <td className='px-4 py-4'>{startDate}</td>
          <td className='px-4 py-4'>
            <button
              onClick={() => {
                setBookingId(booking.id);
                toggleRatingModal()
              }}
              className='font-medium text-blue-600 hover:underline'
            >
              Rate
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className='overflow-x-auto max-w-[340px] rounded-lg mx-auto md:max-w-full shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            <th className='px-4 py-3'>Name</th>
            <th className='px-4 py-3'>Order ID</th>
            <th className='px-4 py-3'>Type</th>
            <th className='px-4 py-3'>Status</th>
            <th className='px-4 py-3'>Price</th>
            <th className='px-4 py-3'>Start Date</th>
            <th className='px-4 py-3'></th>
          </tr>
        </thead>
        <tbody>
          {generateMainContent()}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
