// Types untuk data destinasi wisata & festival budaya
// Diselaraskan dengan kontrak dashboard partner (DestinationItem & CulturalEvent)

export interface AudioSpot {
  id: string
  destinationId: string
  spotNumber: number
  title: string
  duration: string
  description: string
  audioUrl?: string
  isFree: boolean
}

export interface DestinationReview {
  id: string
  userName: string
  userInitials: string
  destination: string
  destinationId: string | null
  rating: number
  comment: string
  status: "APPROVED"
  verified: boolean
  helpfulCount: number
  tags: string[]
  createdAt: string
}

export interface RatingBreakdown {
  5: number
  4: number
  3: number
  2: number
  1: number
}

export interface Destination {
  id: string
  title: string
  city: string
  province: string
  /** String lokasi tampilan; jika kosong dinormalisasi menjadi "city, province" di aggregator */
  location?: string
  region: string
  category: string
  description: string
  image: string
  price: string
  rating: number
  duration: string
  listeners: string
  isPopular?: boolean
  subtitle?: string
  audioSpots?: AudioSpot[]
  reviews?: DestinationReview[]
  reviewsCount?: number
  ratingBreakdown?: RatingBreakdown
}

export interface CulturalFestival {
  id: string
  title: string
  province: string
  region: string
  city: string
  location: string
  /** Basis tanggal 2026, format YYYY-MM-DD */
  startDate: string
  endDate: string
  /** Label tanggal untuk tampilan, mis "14-16 Desember 2026" */
  date: string
  monthBadge: string
  dayBadge: string
  description: string
  image: string
  videoUrl?: string
  type: string
  isSponsored?: boolean
}

export const DESTINATION_CATEGORIES = [
  "alam",
  "pantai",
  "candi",
  "sejarah",
  "religi",
  "desa-adat",
  "danau",
  "gunung",
  "kota",
] as const

export const FESTIVAL_TYPES = [
  "adat",
  "budaya",
  "seni",
  "musik",
  "religi",
  "bahari",
  "kuliner",
] as const