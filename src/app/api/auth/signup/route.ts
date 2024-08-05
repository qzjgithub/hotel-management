import { db } from "@/libs/db";
import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const {email, name, password} = await request.json();
    if (!email || !password || !name) {
      throw new Error('email, name, password cannot be empty');
    }
    const hasUser = await db.user.findFirst({where: {email}});
    if (hasUser) {
      throw new Error('the email has been registered');
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await db.user.create({data: {name, email, password: hashed}});
    return NextResponse.json({
      success: true,
      data: user
    });
  } catch(e: any) {
    return NextResponse.json({
      success: false,
      message: e?.message
    });
  }
}