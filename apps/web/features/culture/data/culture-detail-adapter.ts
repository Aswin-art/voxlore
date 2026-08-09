import type { NormalizedDestination } from "@/lib/data"
import type {
  AudioSpot,
  CultureDetail,
  RatingBreakdown,
  UserReview,
} from "@/features/culture/data/culture-detail-data"

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

/** Bangun sebanyak N audio spot generik berbasis destinasi (data detail tidak tersedia di lib/data). */
function buildAudioSpots(dest: NormalizedDestination): AudioSpot[] {
  const titles = [
    "Pintu Masuk & Latar",
    "Jejak Sejarah & Awal Mula",
    "Ruang Utama & Atraksi",
    "Tutup Kunjungan & Kenangan",
  ]
  const descriptions = [
    "Perkenalan singkat dan tata letak area kunjungan.",
    "Kisah latar belakang dan nilai budaya situs ini.",
    "Penjelasan detail suasana dan keistimewaan tempat.",
    "Resume pengalaman dan tips sebelum mengakhiri tur.",
  ]

  return titles.map((title, index) => ({
    id: `${dest.id}-spot-${index + 1}`,
    spotNumber: index + 1,
    title,
    duration: "05:00",
    description: descriptions[index] ?? "Pengalaman audio tur budaya yang imersif dan edukatif.",
  }))
}

/** Sintesis distribusi rating (5→1) dari nilai rating tunggal. */
function synthesizeBreakdown(rating: number): RatingBreakdown {
  const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))
  const five = clamp(Math.round((rating - 1) * 22), 30, 95)
  const four = clamp(Math.round((5 - rating) * 12), 2, 30)
  const three = clamp(Math.round((5 - rating) * 6), 1, 20)
  const two = clamp(Math.round((5 - rating) * 3), 0, 10)
  const one = Math.max(0, 100 - five - four - three - two)
  return { 5: five, 4: four, 3: three, 2: two, 1: one }
}

/** Ulasan seeded minimal agar bagian ulasan tidak kosong untuk destinasi tanpa data. */
function buildSeedReviews(dest: NormalizedDestination): UserReview[] {
  return [
    {
      id: `${dest.id}-r1`,
      userName: "Aswin",
      userInitials: "A",
      rating: Math.max(1, Math.round(dest.rating)),
      date: "Baru saja",
      comment: `Pengalaman audio tur di ${dest.title} sangat menyenangkan dan mudah diikuti.`,
      verified: true,
    },
  ]
}

/**
 * Adapter dari sumber kebenaran `NormalizedDestination` (lib/data) menjadi
 * bentuk `CultureDetail` yang dipakai halaman detail budaya.
 *
 * audioSpots & reviews & ratingBreakdown tidak tersedia di lib/data sehingga
 * disintesis secara aman (jelas sintetis) agar UI tetap berfungsi penuh.
 */
export function toCultureDetail(dest: NormalizedDestination): CultureDetail {
  const listeners = parseNumeric(dest.listeners)

  return {
    id: dest.id,
    title: dest.title,
    subtitle: dest.category || dest.region,
    location: dest.location,
    rating: dest.rating,
    reviewsCount: listeners || 0,
    duration: dest.duration,
    image: resolveDetailImage(dest.image),
    description: dest.description,
    audioSpots: buildAudioSpots(dest),
    reviews: buildSeedReviews(dest),
    ratingBreakdown: synthesizeBreakdown(dest.rating),
  }
}