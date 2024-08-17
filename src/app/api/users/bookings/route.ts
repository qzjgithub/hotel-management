import { authOptions } from '@/libs/auth';
import { db } from '@/libs/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Authentication Required', { status: 500 });
  }

  const userId = session.user.id;

  try {
    const hotelBookings = await db.booking.findMany({
      select: {
        id: true,
        totalPrice: true,
        createdAt: true,
        checkinDate: true,
        hotelRoom: {
          select: {
            id: true,
            slug: true
          }
        }
      },
      where: {
        userId: {
          equals: userId
        }
      }
    });
    return NextResponse.json(hotelBookings, { status: 200, statusText: 'Successful' });
  } catch (error) {
    return new NextResponse('Unable to fetch', { status: 400 });
  }
}