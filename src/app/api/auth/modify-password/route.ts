import { authOptions } from '@/libs/auth';
import { db } from '@/libs/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Authentication Required', { status: 500 });
    }

    const userId = session.user.id;

    const data = await request.json();
    const {secret} = data;
    if (!secret) {
      return new NextResponse('Secret is required', { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(secret, salt);

    await db.user.update({
      where: {
        id: userId
      },
      data: {
        password: hashed
      }
    });
    return NextResponse.json({
      success: true,
      message: 'Password has been updated'
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Unable to update password'
    });
  }
}
