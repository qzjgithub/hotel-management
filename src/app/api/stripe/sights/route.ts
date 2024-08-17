import Stripe from 'stripe';

import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { db } from '@/libs/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

type TimeSlot = {
  startTime: Date;
  endTime: Date;
}

type RequestData = {
  checkinDate: string;
  adults: number;
  children: number;
  sightsSlug: string;
  timeSlot: TimeSlot;
};

export async function POST(req: Request, res: Response) {
  const {
    checkinDate,
    adults,
    children,
    sightsSlug,
    timeSlot
  }: RequestData = await req.json();

  if (
    !checkinDate ||
    !adults ||
    !sightsSlug ||
    !timeSlot
  ) {
    return new NextResponse('Please all fields are required', { status: 400 });
  }

  const origin = req.headers.get('origin');

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Authentication required', { status: 400 });
  }

  const userId = session.user.id;

  try {
    const sights = await db.sights.findFirst({where: {slug: sightsSlug}});
    if (!sights) return;
    const discountPrice = sights.price - (sights.price / 100) * (sights.discount ?? 1);
    const totalPrice = discountPrice * adults + (sights.childPrice ?? 0) * children;

    // Create a stripe payment
    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            product_data: {
              name: sights.name,
              images: sights.images,
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
        checkoutDate: checkinDate,
        children,
        sights: sights.id,
        user: userId,
        discount: sights.discount,
        totalPrice,
        timeSlot: JSON.stringify(timeSlot)
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
