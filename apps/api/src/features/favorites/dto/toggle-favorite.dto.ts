import { IsNotEmpty, IsString } from 'class-validator';

export class ToggleFavoriteDto {
  @IsString()
  @IsNotEmpty({ message: 'ID Destinasi wajib diisi' })
  destinationId!: string;
}
