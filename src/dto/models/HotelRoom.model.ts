import { IsString, IsDefined, IsOptional, IsIn, IsInt, IsBoolean, IsDate } from "class-validator";
import { Review, Booking } from "./";
import { getEnumValues } from "../helpers";
import { RoomType } from "../enums";
import { OfferedAmenities } from "@/dto/validate/offeredAmenities";

export class HotelRoom {
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
    price!: number;

    @IsOptional()
    discount?: number;

    @IsDefined()
    @IsString()
    images!: string[];

    @IsDefined()
    @IsString()
    coverImage!: string;

    @IsDefined()
    @IsIn(getEnumValues(RoomType))
    type!: RoomType;

    @IsDefined()
    @IsString()
    specialNote!: string;

    @IsOptional()
    @IsString()
    dimension?: string;

    @IsDefined()
    @IsInt()
    numberOfBeds!: number;

    @IsDefined()
    offeredAmenities!: OfferedAmenities[];

    @IsDefined()
    @IsBoolean()
    isFeatured!: boolean;

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
