import { ALL_DESTINATIONS } from "@/lib/data"

/** Kategori destinasi untuk UI filter. */
export const CATEGORIES = [
  "Semua",
  "Candi & Situs",
  "Tari & Seni",
  "Wayang",
  "Museum & Galeri",
  "Desa Wisata",
  "Kuliner Warisan",
  "Kerajinan Adat",
]

/** Provinsi (urutan tetap) dari sumber data destinasi terpadu, dengan "Semua" di index 0. */
export const PROVINCES: string[] = [
  "Semua",
  ...Array.from(new Set(ALL_DESTINATIONS.map((d) => d.province))),
]
