import { IsString, IsDefined, IsInt, IsDate, IsOptional } from "class-validator";
import { User, HotelRoom } from "./";

export class Review {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsString()
    text!: string;

    @IsDefined()
    @IsInt()
    userRating!: number;

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
