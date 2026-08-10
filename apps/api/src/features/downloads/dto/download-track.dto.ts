import { IsNotEmpty, IsString } from 'class-validator';

export class DownloadTrackDto {
  @IsString()
  @IsNotEmpty({ message: 'ID Spot Audio wajib diisi' })
  spotId!: string;
}
