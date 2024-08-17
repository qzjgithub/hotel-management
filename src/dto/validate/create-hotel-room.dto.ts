import { IsString, IsDefined, IsOptional, IsIn, IsInt, IsBoolean, MinLength, IsNumber, IsPositive, Min, Max, IsArray } from "class-validator";
import { getEnumValues } from "@/dto/helpers";
import { RoomType } from "@/dto/enums";
import { Type } from "class-transformer";
import { OfferedAmenities } from "./offered-amenities";

export class CreateHotelRoomDto {
    @IsDefined()
    @IsString()
    @MinLength(1)
    name!: string;

    @IsDefined()
    @IsString()
    @MinLength(1)
    slug!: string;

    @IsDefined()
    @IsString()
    place!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsDefined()
    @IsNumber()
    @IsPositive()
    price!: number;

    @IsOptional()
    @IsPositive()
    @Max(100)
    discount?: number;

    @IsDefined()
    @IsArray({each: true})
    @Type(() => String)
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
    @Min(1)
    numberOfBeds!: number;

    @IsDefined()
    @IsArray({each: true})
    @Type(() => OfferedAmenities)
    offeredAmenities!: OfferedAmenities[];

    @IsDefined()
    @IsBoolean()
    isFeatured!: boolean;
}