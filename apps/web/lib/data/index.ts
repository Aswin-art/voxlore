import type { Destination, CulturalFestival } from "./types"
import { sumatraDestinations, sumatraFestivals } from "./regions/sumatera"
import { jawaDestinations, jawaFestivals } from "./regions/jawa"
import { baliNusaDestinations, baliNusaFestivals } from "./regions/bali-nusa"
import { kalimantanDestinations, kalimantanFestivals } from "./regions/kalimantan"
import { sulawesiDestinations, sulawesiFestivals } from "./regions/sulawesi"
import { malukuPapuaDestinations, malukuPapuaFestivals } from "./regions/maluku-papua"
import { sumatraExtraDestinations } from "./regions/sumatera-extra"
import { jawaExtraDestinations } from "./regions/jawa-extra"
import { baliNusaExtraDestinations } from "./regions/bali-nusa-extra"
import { kalimantanExtraDestinations } from "./regions/kalimantan-extra"
import { sulawesiExtraDestinations } from "./regions/sulawesi-extra"
import { malukuPapuaExtraDestinations } from "./regions/maluku-papua-extra"
import { festivalsAugSep } from "./regions/festivals-aug-sep"

export * from "./types"

/** Destinasi hasil normalisasi: `location` selalu terisi (string) */
export type NormalizedDestination = Destination & { location: string }

/** Normalisasi destinasi: isi `location` otomatis dari city + province jika kosong */
function normalizeDest(d: Destination): NormalizedDestination {
  return { ...d, location: d.location || `${d.city}, ${d.province}` }
}

/** Normalisasi path image agar valid untuk next/image: wajib leading slash atau URL absolut */
export function normalizeImagePath(src: string): string {
  if (!src) return src
  if (src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://")) return src
  return `/${src}`
}

/* ===== DESTINASI ===== */
export const ALL_DESTINATIONS: NormalizedDestination[] = [
  ...sumatraDestinations,
  ...jawaDestinations,
  ...baliNusaDestinations,
  ...kalimantanDestinations,
  ...sulawesiDestinations,
  ...malukuPapuaDestinations,
  ...sumatraExtraDestinations,
  ...jawaExtraDestinations,
  ...baliNusaExtraDestinations,
  ...kalimantanExtraDestinations,
  ...sulawesiExtraDestinations,
  ...malukuPapuaExtraDestinations,
].map((d) => normalizeDest({ ...d, image: normalizeImagePath(d.image) }))

export function getDestinationsByRegion(region: string): NormalizedDestination[] {
  return ALL_DESTINATIONS.filter((d) => d.region === region)
}
export function getDestinationsByProvince(province: string): NormalizedDestination[] {
  return ALL_DESTINATIONS.filter((d) => d.province === province)
}
export function getDestinationById(id: string): NormalizedDestination | undefined {
  return ALL_DESTINATIONS.find((d) => d.id === id)
}
export function getPopularDestinations(limit = 20): NormalizedDestination[] {
  return ALL_DESTINATIONS.filter((d) => d.isPopular).slice(0, limit)
}
export function getDestinationCategories(): string[] {
  return Array.from(new Set(ALL_DESTINATIONS.map((d) => d.category)))
}

/* ===== FESTIVAL ===== */
export const ALL_FESTIVALS: CulturalFestival[] = [
  ...sumatraFestivals,
  ...jawaFestivals,
  ...baliNusaFestivals,
  ...kalimantanFestivals,
  ...sulawesiFestivals,
  ...malukuPapuaFestivals,
  ...festivalsAugSep,
].map((f) => ({ ...f, image: normalizeImagePath(f.image) }))

export function getFestivalsByRegion(region: string): CulturalFestival[] {
  return ALL_FESTIVALS.filter((f) => f.region === region)
}
export function getFestivalsByProvince(province: string): CulturalFestival[] {
  return ALL_FESTIVALS.filter((f) => f.province === province)
}
export function getFestivalById(id: string): CulturalFestival | undefined {
  return ALL_FESTIVALS.find((f) => f.id === id)
}
/** Festival yang berlangsung dalam rentang tanggal (inklusif), format YYYY-MM-DD */
export function getFestivalsInRange(start: string, end: string): CulturalFestival[] {
  return ALL_FESTIVALS.filter((f) => {
    const fEnd = f.endDate
    const fStart = f.startDate
    // overlap jika fStart <= end && fEnd >= start (string compare valid utk ISO YYYY-MM-DD)
    return fStart <= end && fEnd >= start
  })
}
export function getSponsoredFestivals(): CulturalFestival[] {
  return ALL_FESTIVALS.filter((f) => f.isSponsored)
}

/* ===== REGION & PROVINSI ===== */
export const REGIONS: string[] = Array.from(
  new Set([...ALL_DESTINATIONS.map((d) => d.region)]),
)
export const PROVINCES: string[] = Array.from(
  new Set([...ALL_DESTINATIONS.map((d) => d.province)]),
)
