import { ALL_FESTIVALS, getFestivalsInRange } from "@/lib/data"
import type { CulturalFestival } from "@/lib/data"
import type { TravelPlanFilter } from "../types"

const ALL = "Semua"

/** Normalisasi provinsi: trim, lowercase, hapus spasi ganda. */
export function normalizeProvince(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ")
}

/** Filter pure sinkron, reusable untuk fetch maupun komponen. */
export function filterFestivals(
  festivals: CulturalFestival[],
  filter?: TravelPlanFilter,
): CulturalFestival[] {
  if (!filter) return festivals

  const { search, province, start, end } = filter

  let result = festivals
  if (search?.trim()) {
    const q = search.trim().toLowerCase()
    result = result.filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        f.location.toLowerCase().includes(q) ||
        f.city.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q),
    )
  }

  if (province && province !== ALL && province.trim()) {
    const p = normalizeProvince(province)
    result = result.filter((f) => normalizeProvince(f.province) === p)
  }

  if (start && end) {
    result = getFestivalsInRange(start, end).filter((f) =>
      result.some((r) => r.id === f.id),
    )
  } else if (start) {
    result = result.filter((f) => f.endDate >= start)
  } else if (end) {
    result = result.filter((f) => f.startDate <= end)
  }

  return result
}

/**
 * Lapisan akses data async (menyerupai API).
 * Delay kecil sengaja untuk mendemonstrasikan skeleton loading.
 */
export async function fetchFestivals(
  filter?: TravelPlanFilter,
): Promise<CulturalFestival[]> {
  await new Promise((r) => setTimeout(r, 250))
  return filterFestivals(ALL_FESTIVALS, filter)
}

/** Daftar provinsi unik (urutan tetap) dengan "Semua" di index 0. */
export async function fetchProvincesInEvents(): Promise<string[]> {
  const set = new Set<string>()
  for (const f of ALL_FESTIVALS) set.add(f.province)
  return [ALL, ...Array.from(set)]
}

export async function fetchFestivalById(
  id: string,
): Promise<CulturalFestival | undefined> {
  await new Promise((r) => setTimeout(r, 250))
  return ALL_FESTIVALS.find((f) => f.id === id)
}
