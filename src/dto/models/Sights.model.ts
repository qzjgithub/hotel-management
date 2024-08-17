import { IsString, IsDefined, IsOptional, IsInt, IsDate } from "class-validator";
import { Review, Booking } from "./";
import { TimeSlot } from "../validate/time-slot";

export class Sights {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    @IsString()
    slug!: string;

    @IsDefined()
    @IsString()
    place!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsDefined()
    @IsInt()
    duration!: number;

    @IsDefined()
    price!: number;

    @IsOptional()
    childPrice?: number;

    @IsOptional()
    discount?: number;

    @IsDefined()
    @IsString()
    images!: string[];

    @IsDefined()
    @IsString()
    coverImage!: string;

    @IsDefined()
    @IsString()
    ticketNotice!: string;

    @IsDefined()
    @IsString()
    specialNote!: string;

    @IsDefined()
    @IsString()
    subtopics!: string[];

    @IsDefined()
    timeSlots!: TimeSlot[];

    @IsDefined()
    reviews!: Review[];

    @IsDefined()
    bookings!: Booking[];

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;

    @IsOptional()
    @IsDate()
    deletedAt?: Date;
}
