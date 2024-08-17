import { FC, useEffect, useState } from 'react';
import { Review } from '@/models/review';
import Rating from '../Rating/Rating';
import toast from 'react-hot-toast';

const RoomReview: FC<{ reviews: Review[] }> = ({ reviews }) => {

  return (
    <>
      {reviews &&
        reviews.map(review => (
          <div
            className='bg-white dark:bg-gray-900 p-4 rounded-lg'
            key={review.id}
          >
            <p>{review.text}</p>
            <div className='font-semibold mb-2'>
              <div className='flex items-center text-tertiary-light text-lg mb-3'>
                <Rating rating={review.userRating} />
              </div>
              <p>{review.user.name}</p>
            </div>

          </div>
        ))}
    </>
  );
};

export default RoomReview;
