import { IsEmail, IsEnum, IsString } from "class-validator";

export class MailCodeDto {
  @IsEmail()
  email!: string;

  @IsEnum(['signup', 'signin'])
  purpose!: string;
}

export class LoginCheckDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}