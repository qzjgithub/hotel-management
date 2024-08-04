import { db } from "@/libs/db";
import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const {email, password} = await request.json();
    if (!email || !password) {
      throw new Error('邮箱或密码不能为空');
    }
    const hasUser = await db.user.findFirst({where: {email}});
    if (hasUser) {
      throw new Error('该邮箱已被注册');
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await db.user.create({data: {name: email, email, password: hashed}});
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