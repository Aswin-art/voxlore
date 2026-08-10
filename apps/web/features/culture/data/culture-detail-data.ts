import type { AudioSpot, RatingBreakdown, DestinationReview } from "@/lib/data/types"

export type { AudioSpot, RatingBreakdown }

export interface UserReview extends Pick<DestinationReview, "id" | "userName" | "userInitials" | "rating" | "comment" | "verified" | "helpfulCount"> {
  date: string
}

export interface CultureDetail {
  id: string
  title: string
  subtitle: string
  location: string
  rating: number
  reviewsCount: number
  duration: string
  image: string
  description: string
  audioSpots: AudioSpot[]
  reviews: UserReview[]
  ratingBreakdown: RatingBreakdown
}

export const QUICK_TAGS = [
  "Audio Jernih",
  "Narasi Imersif",
  "Alur Edukatif",
  "Musik Etnik Pas",
  "Sangat Direkomendasikan",
]
