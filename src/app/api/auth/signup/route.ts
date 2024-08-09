import { db } from "@/libs/db";
import { NextResponse } from "next/server";
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { validate } from "class-validator";
import { SignupDto } from "@/dto/validate/signup.dto";

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const dto = plainToInstance(SignupDto, data);
    const {email, name, password} = dto;
    const errors = await validate(dto);
    if (errors.length > 0) {
      console.log("validation failed. errors: ", errors);
      const firstError = errors[0].constraints || {};
      const msg = Object.values(firstError)[0];
      throw new Error(msg)
    } else {
        console.log("validation succeed");
    }
    const hasUser = await db.user.findFirst({where: {email}});
    if (hasUser) {
      throw new Error('The email has been registered');
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