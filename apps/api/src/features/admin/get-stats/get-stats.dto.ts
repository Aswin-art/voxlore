export class StatCardDto {
  title!: string;
  value!: string;
  subtext!: string;
  icon!: string;
  badgeColor!: string;
}

export class AdminStatsResponseDto {
  stats!: StatCardDto[];
  totalDestinations!: number;
  totalEvents!: number;
  pendingReviews!: number;
}
