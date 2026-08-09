import type { CulturalFestival } from "@/lib/data"
import { FESTIVAL_TYPES } from "@/lib/data/types"

/** Alias langsung ke sumber kebenaran festival budaya. */
export type FestivalItem = CulturalFestival

/** Kategori festival dari FESTIVAL_TYPES (CulturalFestival.type). */
export type FestivalCategory = (typeof FESTIVAL_TYPES)[number]

/** Filter pencarian/perencanaan liburan. */
export type TravelPlanFilter = {
  search?: string
  province?: string
  start?: string
  end?: string
}

const FESTIVAL_TYPE_LABELS: Record<FestivalCategory, string> = {
  adat: "Upacara Adat",
  budaya: "Festival Budaya",
  seni: "Pentas Seni",
  musik: "Festival Musik",
  religi: "Ritual Keagamaan",
  bahari: "Festival Bahari",
  kuliner: "Kuliner",
}

/** Mapping nilai type → label UI kategori festival. */
export function festivalTypeLabel(type: string): string {
  return FESTIVAL_TYPE_LABELS[type as FestivalCategory] ?? type
}
