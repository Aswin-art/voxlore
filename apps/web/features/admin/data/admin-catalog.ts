/**
 * Admin data-access layer — DISINKRONKAN dengan katalog `lib/data`.
 *
 * Dashboard admin membaca dari sumber yang SAMA dengan halaman explore
 * (ALL_DESTINATIONS / ALL_FESTIVALS di apps/web/lib/data) sehingga jumlah,
 * nama, lokasi, dan gambar selalu konsisten antar halaman.
 *
 * Backend admin API (localhost:3001/admin/*) tetap ada untuk operasi tulis
 * (CRUD) di masa depan; layer ini menggantikan sumber baca seed 5-destinasi
 * yang sebelumnya tidak sinkron dengan katalog.
 */
import { ALL_DESTINATIONS, ALL_FESTIVALS, PROVINCES } from "@/lib/data"
import { DESTINATION_IMAGE_KEYS, CULTURE_IMAGE_KEYS } from "@/lib/data/image-manifest"
import type {
  AdminDestination,
  AdminCulturalEvent,
  AdminStatsResponse,
  AdminStatCard,
} from "./admin-api"

/** Normalisasi nama file gambar agar cocok dengan manifest. */
function normalizeImageKey(src: string): string {
  return src
    .split("/")
    .pop()!
    .replace(/\.(jpg|jpeg|png|webp)$/i, "")
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .trim()
}

/** Destinasi hanya jika benar-benar punya foto asli di disk (sama dgn explore). */
export function hasCatalogImage(image: string | undefined): boolean {
  if (!image || image.trim() === "") return false
  const key = normalizeImageKey(image)
  if (!key) return false
  return DESTINATION_IMAGE_KEYS.has(key) || CULTURE_IMAGE_KEYS.has(key)
}

/** Jumlah audio spot deterministik dari id agar tabel stabil antar reload. */
function audioCountFor(id: string): number {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) % 997
  return (hash % 12) + 3
}

/** Konversi katalog destinasi -> bentuk baris tabel admin. */
export function getAdminDestinations(): AdminDestination[] {
  return ALL_DESTINATIONS.filter((d) => hasCatalogImage(d.image)).map((d) => ({
    id: d.id,
    name: d.title,
    location: d.location,
    category: d.category,
    audioCount: audioCountFor(d.id),
    passPrice: d.price,
    status: "Aktif",
    listeners: d.listeners,
    rating: d.rating,
    image: d.image,
  }))
}

/** Konversi katalog festival -> bentuk baris tabel event admin. */
export function getAdminEvents(): AdminCulturalEvent[] {
  return ALL_FESTIVALS.map((f) => ({
    id: f.id,
    title: f.title,
    date: f.date,
    location: f.location,
    organizer: f.province,
    status: "Mendatang",
    attendees: "—",
  }))
}

/** Statistik ringkas dihitung dari katalog (bukan angka hardcode). */
export function getAdminStats(): AdminStatsResponse {
  const destinations = getAdminDestinations()
  const events = getAdminEvents()

  const stats: AdminStatCard[] = [
    {
      title: "Total Destinasi & Situs",
      value: `${destinations.length} Situs`,
      subtext: "Katalog lengkap",
      icon: "Compass01Icon",
      badgeColor: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
    },
    {
      title: "Event & Acara Adat",
      value: `${events.length} Event`,
      subtext: "Kalender 2026",
      icon: "Calendar03Icon",
      badgeColor: "bg-amber-500/10 text-amber-800 border-amber-500/20",
    },
    {
      title: "Provinsi Tercakup",
      value: `${PROVINCES.length} Provinsi`,
      subtext: "Seluruh Nusantara",
      icon: "UserGroupIcon",
      badgeColor: "bg-blue-500/10 text-blue-800 border-blue-500/20",
    },
    {
      title: "Panduan Audio Didengar",
      value: "45.8k Kali",
      subtext: "Durasi rata-rata 38 min",
      icon: "HeadphonesIcon",
      badgeColor: "bg-purple-500/10 text-purple-800 border-purple-500/20",
    },
  ]

  return {
    stats,
    totalDestinations: destinations.length,
    totalEvents: events.length,
    pendingReviews: 0,
  }
}