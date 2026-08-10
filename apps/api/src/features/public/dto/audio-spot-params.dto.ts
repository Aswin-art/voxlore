import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class AudioSpotParamsDto {
  @IsString()
  @IsNotEmpty()
  destinationId!: string;

  @IsInt()
  @Min(1)
  spotNumber!: number;
}
