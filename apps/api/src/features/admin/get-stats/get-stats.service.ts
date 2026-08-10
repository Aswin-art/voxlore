import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { ReviewStatus } from '@prisma/client';
import { AdminStatsResponseDto } from './get-stats.dto';

@Injectable()
export class GetStatsService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<AdminStatsResponseDto> {
    const [totalDestinations, totalEvents, pendingReviews] = await Promise.all([
      this.prisma.destination.count(),
      this.prisma.festival.count(),
      this.prisma.review.count({ where: { status: ReviewStatus.PENDING } }),
    ]);

    return {
      stats: [
        {
          title: 'Total Destinasi & Situs',
          value: `${totalDestinations} Situs`,
          subtext: '+12 bulan ini',
          icon: 'Compass01Icon',
          badgeColor:
            'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
        },
        {
          title: 'Event & Acara Adat Aktif',
          value: `${totalEvents} Event`,
          subtext: '4 minggu ini',
          icon: 'Calendar03Icon',
          badgeColor: 'bg-amber-500/10 text-amber-800 border-amber-500/20',
        },
        {
          title: 'Total Pengguna Terdaftar',
          value: `${await this.prisma.user.count()} Pengguna`,
          subtext: 'Wisatawan & Komunitas',
          icon: 'UserGroupIcon',
          badgeColor: 'bg-blue-500/10 text-blue-800 border-blue-500/20',
        },
        {
          title: 'Panduan Audio Didengar',
          value: '45.8k Kali',
          subtext: 'Durasi rata-rata 38 min',
          icon: 'HeadphonesIcon',
          badgeColor: 'bg-purple-500/10 text-purple-800 border-purple-500/20',
        },
      ],
      totalDestinations,
      totalEvents,
      pendingReviews,
    };
  }
}
