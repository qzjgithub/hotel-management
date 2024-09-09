'use client';

import useSWR from 'swr';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { LiaFireExtinguisherSolid } from 'react-icons/lia';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import { GiSmokeBomb } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import axios from 'axios';

import LoadingSpinner from '../../loading';
import HotelPhotoGallery from '@/components/HotelPhotoGallery/HotelPhotoGallery';
import BookRoomCta from '@/components/BookRoomCta/BookRoomCta';
import { getStripe } from '@/libs/stripe';
import RoomReview from '@/components/RoomReview/RoomReview';
import toast from 'react-hot-toast';
import BookSightsCta from '@/components/BookSightsCta/BookSightsCta';
import AIDialog from '@/components/AIDialog/AIDialog';

const RoomDetails = (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;

  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [adults, setAdults] = useState(1);
  const [noOfChildren, setNoOfChildren] = useState(0);

  const fetchRoom = async () => {
    const {data} = await axios.get(`/api/places/${slug}`);
    return data?.data;
  };

  const { data: sights, error, isLoading }: any = useSWR('/api/places/detail', fetchRoom);

  useEffect(() => {
    if (sights && sights.timeSlots) {
      setTimeSlot(JSON.stringify(sights.timeSlots[0]));
    }
  }, [sights]);

  if (error) throw new Error('Cannot fetch data');
  if (typeof sights === 'undefined' && !isLoading)
    throw new Error('Cannot fetch data');

  if (!sights) return <LoadingSpinner />;

  const handleBookNowClick = async () => {
    if (!checkinDate)
      return toast.error('Please provide date');

    const sightsSlug = sights.slug;

    let timeSlotObj = null;
    try {
      timeSlotObj = JSON.parse(timeSlot || '');
    } catch(e) {
      return toast.error('Please select time slot');
    }

    const stripe = await getStripe();

    try {
      const { data: stripeSession } = await axios.post('/api/stripe/sights', {
        checkinDate,
        adults,
        children: noOfChildren,
        sightsSlug,
        timeSlot: timeSlotObj
      });

      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: stripeSession.id,
        });

        if (result.error) {
          toast.error('Payment Failed');
        }
      }
    } catch (error) {
      console.log('Error: ', error);
      toast.error('An error occured');
    }
  };

  return (
    <div>
      <HotelPhotoGallery photos={sights.images} />

      <div className='container mx-auto mt-20'>
        <div className='md:grid md:grid-cols-12 gap-10 px-3'>
          <div className='md:col-span-8 md:w-full'>
            <div>
              <h2 className='font-bold text-left text-lg md:text-2xl'>
                {sights?.name} ({sights?.duration}H)
              </h2>
              <div className='flex my-11'>
                {sights?.subtopics?.map((subtopic: any, ind: number) => (
                  <div
                    key={ind}
                    className='md:w-44 w-fit text-center px-2 md:px-0 h-20 md:h-40 mr-3 bg-[#eff0f2] dark:bg-gray-800 rounded-lg grid place-content-center'
                  >
                    <p className='text-xs md:text-base pt-3'>
                      {subtopic}
                    </p>
                  </div>
                ))}
              </div>
              <div className='mb-11'>
                <h2 className='font-bold text-3xl mb-2'>Description</h2>
                <p>{sights.description}</p>
              </div>
              <div className='mb-11'>
                <h2 className='font-bold text-3xl mb-2'>Time Slots</h2>
                <div className='grid grid-cols-2'>
                  {sights?.timeSlots?.map((timeSlot: any, ind: number) => (
                    <div
                      key={ind}
                      className='flex items-center md:my-0 my-1'
                    >
                      <p className='text-xs md:text-base ml-2'>
                        {timeSlot.startTime} - {timeSlot.endTime}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='mb-11'>
                <h2 className='font-bold text-3xl mb-2'>Special Note</h2>
                <div className='grid grid-cols-1'>
                  <div className='flex items-center my-1 md:my-0'>
                    <p className='ml-2 md:text-base text-xs'>{sights?.specialNote}</p>
                  </div>
                </div>
              </div>

              <div className='shadow dark:shadow-white rounded-lg p-6'>
                <div className='items-center mb-4'>
                  <p className='md:text-lg font-semibold'>Customer Reviews</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {!!sights && <RoomReview reviews={sights.reviews} />}
                </div>
              </div>
            </div>
          </div>

          <div className='md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white sticky top-10 h-fit overflow-auto'>
            <BookSightsCta
              discount={sights.discount}
              price={sights.price}
              childPrice={sights.childPrice}
              ticketNotice={sights.ticketNotice}
              checkinDate={checkinDate}
              setCheckinDate={setCheckinDate}
              timeSlot={timeSlot}
              setTimeSlot={setTimeSlot}
              timeSlots={sights?.timeSlots}
              adults={adults}
              noOfChildren={noOfChildren}
              setAdults={setAdults}
              setNoOfChildren={setNoOfChildren}
              isBooked={sights.isBooked}
              handleBookNowClick={handleBookNowClick}
            />
          </div>
        </div>
      </div>
      
      <AIDialog
        title={sights.name}
        type='Place'
        detail={`${sights.name}\n${sights.description}`}
        item={sights}
      />
    </div>
  );
};

export default RoomDetails;
