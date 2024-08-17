import { IsString, IsDefined, IsDate, IsInt, IsOptional } from "class-validator";
import { User, HotelRoom, Sights } from "./";

export class Booking {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsDate()
    checkinDate!: Date;

    @IsDefined()
    @IsDate()
    checkoutDate!: Date;

    @IsOptional()
    @IsInt()
    numberOfDays?: number;

    @IsOptional()
    timeSlot?: TimeSlot;

    @IsDefined()
    discount!: number;

    @IsDefined()
    @IsInt()
    adults!: number;

    @IsDefined()
    @IsInt()
    children!: number;

    @IsDefined()
    totalPrice!: number;

    @IsDefined()
    @IsString()
    userId!: string;

    @IsDefined()
    user!: User;

    @IsOptional()
    @IsString()
    hotelRoomId?: string;

    @IsOptional()
    hotelRoom?: HotelRoom;

    @IsOptional()
    @IsString()
    sightsId?: string;

    @IsOptional()
    sights?: Sights;

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
