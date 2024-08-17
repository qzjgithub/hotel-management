import { IsString, IsDefined, IsBoolean, IsOptional, IsDate } from "class-validator";
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
    name!: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsDefined()
    @IsString()
    password!: string;

    @IsDefined()
    @IsString()
    email!: string;

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
