import { IsArray, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTravelPlanDto {
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  title!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(120)
  province!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(120)
  dateRange!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(120, { each: true })
  festivalIds?: string[];
}

export class UpdateTravelPlanDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  province?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  dateRange?: string;
}

export class AddTravelPlanItemDto {
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  festivalId!: string;
}
