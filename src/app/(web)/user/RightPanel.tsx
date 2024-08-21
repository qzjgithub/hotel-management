'use client';
import Chart from '@/components/Chart/Chart';
import RatingModal from '@/components/RatingModal/RatingModal';
import Table from '@/components/Table';
import { useEffect, useState } from 'react'
import { BsJournalBookmarkFill } from 'react-icons/bs';
import { GiMoneyStack } from 'react-icons/gi';
import toast from 'react-hot-toast';
import BackDrop from '@/components/BackDrop/BackDrop';

type NavType = 'bookings' | 'amount' | 'ratings';

const RightPabel = () => {
  const [currentNav, setCurrentNav] = useState<NavType>('bookings');

  const [bookingId, setBookingId] = useState<string | null>(null);

  const [isRatingVisible, setIsRatingVisible] = useState(false);

  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const [ratingValue, setRatingValue] = useState<number | null>(0);

  const [ratingText, setRatingText] = useState('');

  const [userBookings, setUserBookings] = useState<any>([]);

  const [bookingLoading, setBookingLoading] = useState(false);

  const toggleRatingModal = () => setIsRatingVisible(prevState => !prevState);

  useEffect(() => {
    if (!isRatingVisible) {
      setRatingValue(0);
      setRatingText('');
      setIsSubmittingReview(false);
    }
  }, [isRatingVisible]);

  const fetchUserBookings = async () => {
    try {
      setBookingLoading(true);
      const result = await fetch('/api/users/bookings');
      const data = await result.json();
      setUserBookings(data);
    } catch {
      // do nothing
    } finally {
      setBookingLoading(false);
    }
  }

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const reviewSubmitHandler = async() => {
    if (!ratingText.trim().length || !ratingValue) {
      return toast.error('Please provide a rating text and a rating');
    }

    if (!bookingId) {
      return toast.error('Id not provided');
    }

    setIsSubmittingReview(true);

    try {
      await fetch('/api/users/bookings/ratings', {
        method: 'POST',
        body: JSON.stringify({
          bookingId,
          rating: ratingValue,
          text: ratingText
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setIsRatingVisible(false);
      toast.success('Review submitted successfully');
    } catch (error) {
      toast.error('Error submitting review');
    }
  };

  return (
    <>
      <nav className='sticky top-0 px-2 w-fit mx-auto md:w-full md:px-5 py-3 mb-8 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 mt-7'>
        <ol
          className={`${
            currentNav === 'bookings' ? 'text-blue-600' : 'text-gray-700'
          } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
        >
          <li
            onClick={() => setCurrentNav('bookings')}
            className='inline-flex items-center cursor-pointer'
          >
            <BsJournalBookmarkFill />
            <a className='inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium'>
              Current Bookings
            </a>
          </li>
        </ol>
        <ol
          className={`${
            currentNav === 'amount' ? 'text-blue-600' : 'text-gray-700'
          } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
        >
          <li
            onClick={() => setCurrentNav('amount')}
            className='inline-flex items-center cursor-pointer'
          >
            <GiMoneyStack />
            <a className='inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium'>
              Amount Spent
            </a>
          </li>
        </ol>
      </nav>

      {
        currentNav === 'bookings' ? (
          <Table
            bookingDetails={userBookings}
            setBookingId={setBookingId}
            toggleRatingModal={toggleRatingModal}
          />
        ) : null
      }

      {
        currentNav === 'amount' ? (
          <Chart
            userBookings={userBookings}
          />
        ) : null
      }
      <RatingModal
        isOpen={isRatingVisible}
        ratingValue={ratingValue}
        setRatingValue={setRatingValue}
        ratingText={ratingText}
        setRatingText={setRatingText}
        isSubmittingReview={isSubmittingReview}
        reviewSubmitHandler={reviewSubmitHandler}
        toggleRatingModal={toggleRatingModal}
      />
      <BackDrop isOpen={isRatingVisible} />
    </>
  )
}

export default RightPabel