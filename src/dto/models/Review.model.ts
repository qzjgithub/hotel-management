import { IsString, IsDefined, IsInt, IsOptional, IsDate } from "class-validator";
import { User, HotelRoom, Sights } from "./";

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
