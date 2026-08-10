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
    result = result.filter((f) => f.startDate <= end && f.endDate >= start)
  } else if (start) {
    result = result.filter((f) => f.endDate >= start)
  } else if (end) {
    result = result.filter((f) => f.startDate <= end)
  }

  return result
}

export async function fetchFestivals(
  filter?: TravelPlanFilter,
): Promise<CulturalFestival[]> {
  const params = new URLSearchParams()
  if (filter?.search?.trim()) params.set("search", filter.search.trim())
  if (filter?.province && filter.province !== ALL) params.set("province", filter.province)
  if (filter?.start) params.set("start", filter.start)
  if (filter?.end) params.set("end", filter.end)

  const response = await fetch(`/api/festivals?${params.toString()}`)
  if (!response.ok) throw new Error(`Gagal memuat festival (${response.status})`)
  return filterFestivals((await response.json()) as CulturalFestival[], filter)
}

/** Daftar provinsi unik dari katalog festival. */
export async function fetchProvincesInEvents(): Promise<string[]> {
  const response = await fetch("/api/provinces")
  if (!response.ok) throw new Error(`Gagal memuat provinsi (${response.status})`)
  const payload = (await response.json()) as { data: { name: string }[] }
  return [ALL, ...payload.data.map((province) => province.name)]
}

export async function fetchFestivalById(
  id: string,
): Promise<CulturalFestival | undefined> {
  const response = await fetch(`/api/festivals/${encodeURIComponent(id)}`)
  if (response.status === 404) return undefined
  if (!response.ok) throw new Error(`Gagal memuat festival (${response.status})`)
  return (await response.json()) as CulturalFestival
}
