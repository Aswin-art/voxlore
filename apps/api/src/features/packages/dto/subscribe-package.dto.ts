import { IsNotEmpty, IsString } from 'class-validator';

export class SubscribePackageDto {
  @IsString()
  @IsNotEmpty({ message: 'ID Paket wajib diisi' })
  planId!: string;
}
