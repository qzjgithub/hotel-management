import {MailCodeDto} from '@/dto/validate/mail-code.dto';
import { generateCode, saveTimer, sendEmail } from '@/libs/email';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const dto = plainToInstance(MailCodeDto, data);
    const errors = await validate(dto);
    if (errors.length > 0) {
      const firstError = errors[0].constraints || {};
      const msg = Object.values(firstError)[0];
      throw new Error(msg);
    } else {
      console.log('validation succeed');

    }
    const {email} = dto;
    const code = generateCode();
    const res = await sendEmail(email, 'Code', `Your code is ${code}`);
    saveTimer(email, code);
    if (!res) {
      throw new Error('Failed to send email');
    } else {
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