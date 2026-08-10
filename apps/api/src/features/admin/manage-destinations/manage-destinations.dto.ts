import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateDestinationDto {
  @IsString()
  name!: string;

  @IsString()
  location!: string;

  @IsString()
  category!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  audioCount?: number;

  @IsOptional()
  @IsString()
  passPrice?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  listeners?: string;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsString()
  image?: string;
}

export class UpdateDestinationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  audioCount?: number;

  @IsOptional()
  @IsString()
  passPrice?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  listeners?: string;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsString()
  image?: string;
}
