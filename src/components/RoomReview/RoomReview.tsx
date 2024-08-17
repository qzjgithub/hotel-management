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
            className='bg-gray-100 dark:bg-gray-900 p-4 rounded-lg'
            key={review.id}
          >
            <div className='font-semibold mb-2 flex'>
              <p>{review.user.name}</p>
              <div className='ml-4 flex items-center text-tertiary-light text-lg'>
                <Rating rating={review.userRating} />
              </div>
            </div>

            <p>{review.text}</p>
          </div>
        ))}
    </>
  );
};

export default RoomReview;
