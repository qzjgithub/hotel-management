import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/libs/db';

const checkout_session_completed = 'checkout.session.completed';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20'
});

export async function POST(req: Request, res: Response) {
  const reqBody = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
  }

  // load our event
  switch (event.type) {
    case checkout_session_completed:
      const session = event.data.object;

      const {
        metadata: {
          adults,
          checkinDate,
          checkoutDate,
          children,
          hotelRoom,
          numberOfDays,
          user,
          discount,
          totalPrice,
          sights,
          timeSlot
        },
      } = session as any;
      const data: any = {
        adults: Number(adults),
        checkinDate,
        children: Number(children),
        discount: Number(discount),
        totalPrice: Number(totalPrice),
        userId: user
      };
      if (hotelRoom) {
        data.checkoutDate = checkoutDate;
        data.hotelRoomId = hotelRoom;
        data.numberOfDays = Number(numberOfDays);
      } else if (sights) {
        data.checkoutDate = checkinDate;
        data.sightsId = sights;
        try {
          data.timeSlot = JSON.parse(timeSlot);
        } catch {
          data.timeSlot = {};
        }
      }

      await db.booking.create({
        data
      });

      return NextResponse.json('Booking successful', {
        status: 200,
        statusText: 'Booking Successful',
      });

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json('Event Received', {
    status: 200,
    statusText: 'Event Received',
  });
}