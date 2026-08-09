import { ALL_DESTINATIONS, getDestinationCategories } from "@/lib/data"
import type { NormalizedDestination } from "@/lib/data"
import { DESTINATION_IMAGE_KEYS, CULTURE_IMAGE_KEYS } from "@/lib/data/image-manifest"

export interface DestinationFilter {
  search?: string
  category?: string
  province?: string
}

const ALL = "Semua"

/** Normalisasi provinsi: trim, lowercase, hapus spasi ganda (selaras dgn events slice). */
export function normalizeProvince(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ")
}

/** Normalisasi nama file gambar: lowercase + spasi -> strip (selaras dgn manifest). */
function normalizeImageKey(src: string): string {
  return src
    .split("/")
    .pop()!
    .replace(/\.(jpg|jpeg|png|webp)$/i, "")
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .trim()
}

/** Cek apakah path gambar benar-benar ada di disk (dest / culture manifest). */
export function hasValidImage(d: NormalizedDestination): boolean {
  if (!d.image || d.image.trim() === "") return false
  const key = normalizeImageKey(d.image)
  if (!key) return false
  return DESTINATION_IMAGE_KEYS.has(key) || CULTURE_IMAGE_KEYS.has(key)
}

/** Filter pure sinkron, reusable untuk fetch maupun komponen. */
export function filterDestinations(
  items: NormalizedDestination[],
  filter?: DestinationFilter,
): NormalizedDestination[] {
  // Selalu tampilkan hanya destinasi yang punya gambar
  let result = items.filter(hasValidImage)

  if (!filter) return result

  const { search, category, province } = filter

  if (search?.trim()) {
    const q = search.trim().toLowerCase()
    result = result.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q),
    )
  }

  if (category && category !== ALL) {
    result = result.filter((d) => d.category === category)
  }

  if (province && province !== ALL && province.trim()) {
    const p = normalizeProvince(province)
    result = result.filter((d) => normalizeProvince(d.province) === p)
  }

  return result
}

/**
 * Lapisan akses data destinasi (menyerupai API).
 * Delay kecil sengaja untuk mendemonstrasikan skeleton loading.
 */
export async function fetchExploreDestinations(
  filter?: DestinationFilter,
): Promise<NormalizedDestination[]> {
  await new Promise((r) => setTimeout(r, 250))
  return filterDestinations(ALL_DESTINATIONS, filter)
}

/** Daftar kategori destinasi dari sumber data terpadu, dengan "Semua" di index 0. */
export async function fetchDestinationCategories(): Promise<string[]> {
  return [ALL, ...getDestinationCategories()]
}
