import Stripe from 'stripe';

import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { db } from '@/libs/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

type RequestData = {
  checkinDate: string;
  checkoutDate: string;
  adults: number;
  children: number;
  numberOfDays: number;
  hotelRoomSlug: string;
};

export async function POST(req: Request, res: Response) {
  const {
    checkinDate,
    adults,
    checkoutDate,
    children,
    hotelRoomSlug,
    numberOfDays,
  }: RequestData = await req.json();

  if (
    !checkinDate ||
    !checkoutDate ||
    !adults ||
    !hotelRoomSlug ||
    !numberOfDays
  ) {
    return new NextResponse('Please all fields are required', { status: 400 });
  }

  const origin = req.headers.get('origin');

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Authentication required', { status: 400 });
  }

  const userId = session.user.id;
  const formattedCheckoutDate = checkoutDate.split('T')[0];
  const formattedCheckinDate = checkinDate.split('T')[0];

  try {
    const room = await db.hotelRoom.findFirst({where: {slug: hotelRoomSlug}});
    if (!room) return;
    const discountPrice = room.price - (room.price / 100) * (room.discount || 1);
    const totalPrice = discountPrice * numberOfDays;

    // Create a stripe payment
    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            product_data: {
              name: room.name,
              images: room.images,
            },
            unit_amount: parseInt((totalPrice * 100).toString()),
          },
        },
      ],
      payment_method_types: ['card'],
      success_url: `${origin}/user`,
      metadata: {
        adults,
        checkinDate: checkinDate,
        checkoutDate: checkoutDate,
        children,
        hotelRoom: room.id,
        numberOfDays,
        user: userId,
        discount: room.discount,
        totalPrice
      }
    });

    return NextResponse.json(stripeSession, {
      status: 200,
      statusText: 'Payment session created',
    });
  } catch (error: any) {
    console.log('Payment falied', error);
    return new NextResponse(error, { status: 500 });
  }
}
