import { IsIn } from 'class-validator';

export class UpdateReviewStatusDto {
  @IsIn(['Setujui', 'Tolak', 'Perlu Moderasi'])
  status!: 'Setujui' | 'Tolak' | 'Perlu Moderasi';
}
