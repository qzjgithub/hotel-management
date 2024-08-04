import { db } from "@/libs/db";
import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const {name, password} = await request.json();
    if (!name || !password) {
      throw new Error('name or password is null');
    }
    const hasUser = await db.user.findFirst({where: {name}});
    if (hasUser) {
      throw new Error('name has exist');
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await db.user.create({data: {name, password: hashed}});
    return NextResponse.json(user);
  } catch(e) {
    return NextResponse.json(e);
  }
}