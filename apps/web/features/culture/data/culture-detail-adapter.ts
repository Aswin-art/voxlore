import type { NormalizedDestination } from "@/lib/data"
import type { CultureDetail } from "@/features/culture/data/culture-detail-data"

/**
 * Gambar placeholder yang dijamin ada untuk destinasi tanpa gambar valid.
 * Gunakan gambar hero prambanan sebagai fallback aman agar tidak pernah
 * menghasilkan broken image di halaman detail.
 */
export const FALLBACK_DETAIL_IMAGE = "/images/prambanan-hero.png"

/** Parser sederhana utilitas ekstraksi angka dari string seperti "1.2K", "500". */
function parseNumeric(value: string): number {
  if (!value) return 0
  const trimmed = value.trim().toUpperCase()
  if (trimmed.endsWith("K")) {
    const num = parseFloat(trimmed.slice(0, -1))
    return Number.isFinite(num) ? Math.round(num * 1000) : 0
  }
  if (trimmed.endsWith("M")) {
    const num = parseFloat(trimmed.slice(0, -1))
    return Number.isFinite(num) ? Math.round(num * 1_000_000) : 0
  }
  const num = parseFloat(trimmed.replace(/[,.]/g, ""))
  return Number.isFinite(num) ? Math.round(num) : 0
}

/** Pastikan image valid untuk next/image: leading slash / URL absolut, jika tidak fallback. */
function resolveDetailImage(image: string): string {
  if (image && (image.startsWith("/") || image.startsWith("http://") || image.startsWith("https://"))) {
    return image
  }
  return FALLBACK_DETAIL_IMAGE
}



/**
 * Adapter dari sumber kebenaran `NormalizedDestination` (lib/data) menjadi
 * bentuk `CultureDetail` yang dipakai halaman detail budaya.
 *
 * audioSpots, reviews, dan ratingBreakdown berasal dari API detail destinasi.
 */
export function toCultureDetail(dest: NormalizedDestination): CultureDetail {
  const listeners = parseNumeric(dest.listeners)

  return {
    id: dest.id,
    title: dest.title,
    subtitle: dest.subtitle || dest.category || dest.region,
    location: dest.location,
    rating: dest.rating,
    reviewsCount: dest.reviewsCount ?? listeners,
    duration: dest.duration,
    image: resolveDetailImage(dest.image),
    description: dest.description,
    audioSpots: (dest.audioSpots ?? []).map((spot) => ({
      ...spot,
      destinationId: dest.id,
    })),
    reviews: (dest.reviews ?? []).map((review) => ({
      id: review.id,
      userName: review.userName,
      userInitials: review.userInitials,
      rating: review.rating,
      date: new Date(review.createdAt).toLocaleDateString("id-ID"),
      comment: review.comment,
      verified: review.verified,
      helpfulCount: review.helpfulCount,
    })),
    ratingBreakdown: dest.ratingBreakdown ?? { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  }
}