import { IsString, IsDefined, IsBoolean, IsOptional, IsDate, IsEmail, MinLength, MaxLength } from "class-validator";
import { Review, Booking } from "./";

export class User {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsBoolean()
    isAdmin!: boolean;

    @IsDefined()
    @IsString()
    @MinLength(4)
    @MaxLength(64)
    name!: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsDefined()
    @IsString()
    @MinLength(6)
    @MaxLength(64)
    password!: string;

    @IsOptional()
    @IsString()
    @IsEmail({}, {message: 'The email format is incorrect'})
    email?: string;

    @IsOptional()
    @IsDate()
    emailVerified?: Date;

    @IsOptional()
    @IsString()
    about?: string;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;

    @IsOptional()
    @IsDate()
    deletedAt?: Date;

    @IsDefined()
    reviews!: Review[];

    @IsDefined()
    bookings!: Booking[];
}
