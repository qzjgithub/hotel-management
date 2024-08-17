import { IsString, IsOptional, IsInt, Min, Max } from "class-validator";

export class SearchSightsDto {
  @IsOptional()
  @IsString()
  place?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(8)
  minDuration?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(8)
  maxDuration?: number;

  @IsOptional()
  @IsString()
  name?: string;
}