// Public catalog types — manual mirror of apps/web/lib/data/types.ts.
export interface Destination {
  id: string;
  title: string;
  city: string;
  province: string;
  /** String lokasi tampilan; selalu terisi di catalog.data.ts */
  location: string;
  region: string;
  category: string;
  description: string;
  image: string;
  price: string;
  rating: number;
  duration: string;
  listeners: string;
  isPopular?: boolean;
}

export interface CulturalFestival {
  id: string;
  title: string;
  province: string;
  region: string;
  city: string;
  location: string;
  /** Basis tanggal 2026, format YYYY-MM-DD */
  startDate: string;
  endDate: string;
  /** Label tanggal untuk tampilan, mis "14-16 Desember 2026" */
  date: string;
  monthBadge: string;
  dayBadge: string;
  description: string;
  image: string;
  videoUrl?: string;
  type: string;
  isSponsored?: boolean;
}