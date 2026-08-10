import { IsNotEmpty, IsString } from 'class-validator';

export class ScanQrDto {
  @IsString()
  @IsNotEmpty({ message: 'Kode QR wajib diisi' })
  code!: string;
}
