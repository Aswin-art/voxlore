import { IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title!: string;

  @IsString()
  date!: string;

  @IsString()
  location!: string;

  @IsString()
  organizer!: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  attendees?: string;
}

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  organizer?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  attendees?: string;
}
