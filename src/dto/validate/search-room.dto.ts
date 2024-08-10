import { IsString, IsOptional, IsIn, IsInt, IsDate, IsDefined, Min } from "class-validator";
import { getEnumValues } from "../helpers";
import { RoomType } from "../enums";

export class SearchRoomDto {
  @IsOptional()
  @IsString()
  place?: string;

  @IsOptional()
  @IsIn(getEnumValues(RoomType))
  type?: RoomType;

  @IsOptional()
  @IsDate()
  checkinDate?: Date;

  @IsOptional()
  @IsDate()
  checkoutDate?: Date;

  @IsOptional()
  @IsInt()
  numberOfBeds?: number;

  @IsOptional()
  @IsString()
  name?: string;
}