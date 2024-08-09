import { IsString, IsDefined, IsOptional, IsEmail, MinLength, MaxLength } from "class-validator";
import { User } from "@/dto/models";
import { Expose } from "class-transformer";

export class SignupDto implements Pick<User, 'email' | 'name' | 'password'> {
  @IsDefined()
  @IsString()
  @MinLength(4)
  @MaxLength(64)
  @Expose()
  name!: string;

  @IsDefined()
  @IsString()
  @MinLength(6)
  @MaxLength(64)
  @Expose()
  password!: string;

  @IsOptional()
  @IsString()
  @IsEmail({}, {message: 'The email format is incorrect'})
  @Expose()
  email?: string;
}