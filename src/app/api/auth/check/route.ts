import { LoginCheckDto } from '@/dto/validate/mail-code.dto';
import { db } from '@/libs/db';
import { saveTimer, sendEmail } from '@/libs/email';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const dto = plainToInstance(LoginCheckDto, data);
    const errors = await validate(dto);
    if (errors.length > 0) {
      const firstError = errors[0].constraints || {};
      const msg = Object.values(firstError)[0];
      throw new Error(msg);
    } else {
      console.log('validation succeed');
    }
    const {email, password} = dto;
    const user = await db.user.findFirst({where: {email}});
    if (!user) {
      throw new Error('Email or password is incorrect');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Email or password is incorrect');
    }
    if (email === process.env.NO_VERIFY_EMAIL) {
      return NextResponse.json({
        success: true,
        data: null
      });
    }
    const code = Math.floor(100000 + Math.random() * 900000);
    const res = await sendEmail(email, 'Code', `Your code is ${code}`);
    if (!res) {
      throw new Error('Failed to send email');
    } else {
      saveTimer(email, code);
      return NextResponse.json({
        success: true,
        data: null
      });
    }
  } catch (e: any) {
    return NextResponse.json({
      success: false,
      message: e?.message
    });
  }
}