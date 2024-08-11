import { db } from "@/libs/db";
import { NextResponse } from "next/server";
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { validate } from "class-validator";
import { SignupDto } from "@/dto/validate/signup.dto";
import { deleteTimer, generateCode, saveTimer, verifyCode } from '@/libs/email';

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const dto = plainToInstance(SignupDto, data);
    const {email, name, password, code} = dto;
    const errors = await validate(dto);
    if (errors.length > 0) {
      const firstError = errors[0].constraints || {};
      const msg = Object.values(firstError)[0];
      throw new Error(msg)
    } else {
        console.log("validation succeed");
    }
    const codeFlag = verifyCode(email, code);
    if (!codeFlag) {
      throw new Error('The verification code is incorrect or expired');
    }
    const hasUser = await db.user.findFirst({where: {email}});
    if (hasUser) {
      throw new Error('The email has been registered');
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await db.user.create({data: {name, email, password: hashed}});
    deleteTimer(email);
    const newCode = generateCode();
    saveTimer(email, newCode);
    return NextResponse.json({
      success: true,
      data: user,
      loginCode: newCode
    });
  } catch(e: any) {
    return NextResponse.json({
      success: false,
      message: e?.message
    });
  }
}