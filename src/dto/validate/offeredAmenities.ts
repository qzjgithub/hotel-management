import { IsDefined, IsOptional, IsString } from "class-validator";

export class OfferedAmenities {
  /// Icon
  @IsOptional()
  @IsString()
  icon?: string;
  /// Amenity
  @IsDefined()
  @IsString()
  amenity!: string;
}