import { authOptions } from '@/libs/auth';
import { db } from '@/libs/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const {
    bookingId, rating, text
  } = await req.json();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response('Unauthorized', {status: 401});
  }

  const userId = session.user.id;

  try {
    const booking = await db.booking.findFirst({
      where: {
        userId: userId,
        id: bookingId
      }
    });
    if (!booking) {
      return new NextResponse('Booking not found', {status: 404});
    }
    const mode = booking.hotelRoomId ? 'hotel' : 'place';
    await db.review.create({
      data: {
        userId,
        text,
        userRating: rating,
        ...(mode === 'hotel' ? {hotelRoomId: booking.hotelRoomId} : {sightsId: booking.sightsId})
      }
    });
    return NextResponse.json({
      success: true,
      data: {}
    }, {status: 200, statusText: 'Successful'});
  } catch (error) {
    return new NextResponse('Error fetching booking', {status: 500});
  }
}
