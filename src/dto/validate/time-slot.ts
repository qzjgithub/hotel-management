import { IsDefined, IsOptional, IsString } from "class-validator";

export class TimeSlot {
  /// Icon
  @IsOptional()
  @IsString()
  startTime!: string;
  /// Amenity
  @IsDefined()
  @IsString()
  endTime!: string;
}