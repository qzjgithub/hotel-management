import { IsString, IsDefined, IsDate, IsInt, IsOptional } from "class-validator";
import { User, HotelRoom } from "./";

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

    @IsDefined()
    @IsInt()
    numberOfDays!: number;

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

    @IsDefined()
    @IsString()
    hotelRoomId!: string;

    @IsDefined()
    hotelRoom!: HotelRoom;

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
