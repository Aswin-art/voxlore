import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateProfileInfoDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Format email tidak valid' })
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
