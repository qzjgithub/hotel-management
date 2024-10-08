import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { db } from '@/libs/db';

import { authOptions } from '@/libs/auth';

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Authentication Required', { status: 500 });
  }

  const userId = session.user.id;

  try {
    const data = await db.user.findFirst({
      where: {id: userId},
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        about: true,
        isAdmin: true,
        createdAt: true
      }
    });
    return NextResponse.json(data, { status: 200, statusText: 'Successful' });
  } catch (error) {
    return new NextResponse('Unable to fetch', { status: 400 });
  }
}