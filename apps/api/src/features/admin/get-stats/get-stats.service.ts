import { Injectable } from '@nestjs/common';
import { AdminStore } from '../admin.store';
import { AdminStatsResponseDto } from './get-stats.dto';

@Injectable()
export class GetStatsService {
  constructor(private readonly store: AdminStore) {}

  execute(): AdminStatsResponseDto {
    const destinations = this.store.getDestinations();
    const events = this.store.getEvents();
    const reviews = this.store.getReviews();

    const pendingReviews = reviews.filter(
      (r) => r.status === 'Perlu Moderasi',
    ).length;

    return {
      stats: [
        {
          title: 'Total Destinasi & Situs',
          value: `${destinations.length} Situs`,
          subtext: '+12 bulan ini',
          icon: 'Compass01Icon',
          badgeColor:
            'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
        },
        {
          title: 'Event & Acara Adat Aktif',
          value: `${events.length} Event`,
          subtext: '4 minggu ini',
          icon: 'Calendar03Icon',
          badgeColor: 'bg-amber-500/10 text-amber-800 border-amber-500/20',
        },
        {
          title: 'Total Pengguna Terdaftar',
          value: '12,480',
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
      totalDestinations: destinations.length,
      totalEvents: events.length,
      pendingReviews,
    };
  }
}
