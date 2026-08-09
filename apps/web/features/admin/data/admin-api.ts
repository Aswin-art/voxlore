/**
 * Data-access layer admin dashboard.
 *
 * Sumber data BACA: katalog `lib/data` (SAMA dengan halaman explore) lewat
 * `admin-catalog.ts`, sehingga jumlah/nama/lokasi/gambar selalu sinkron.
 * Backend admin API masih tersedia untuk operasi tulis (CRUD) masa depan.
 */
import {
  getAdminStats,
  getAdminDestinations,
  getAdminEvents,
} from "./admin-catalog"

export interface AdminStatCard {
  title: string
  value: string
  subtext: string
  icon: string
  badgeColor: string
}

export interface AdminStatsResponse {
  stats: AdminStatCard[]
  totalDestinations: number
  totalEvents: number
  pendingReviews: number
}

/** Struktur item destinasi sesuai store backend. */
export interface AdminDestination {
  id: string
  name: string
  location: string
  category: string
  audioCount: number
  passPrice: string
  status: string
  listeners: string
  rating: number
  image: string
}

/** Struktur item event budaya sesuai store backend. */
export interface AdminCulturalEvent {
  id: string
  title: string
  date: string
  location: string
  organizer: string
  status: string
  attendees: string
}

/** Struktur item ulasan sesuai store backend. */
export interface AdminReview {
  id: string
  user: string
  destination: string
  rating: number
  comment: string
  time: string
  status: string
}

async function adminRequest<T>(path: string): Promise<T> {
  const res = await fetch(`/api/admin${path}`, {
    headers: { "Content-Type": "application/json" },
  })

  if (!res.ok) {
    throw new Error(`Gagal memuat data admin (${res.status})`)
  }

  return res.json() as Promise<T>
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

/** Stats dihitung dari katalog lib/data (sinkron dgn explore). */
export async function fetchAdminStats(): Promise<AdminStatsResponse> {
  await delay(150)
  return getAdminStats()
}

/** Destinasi dari katalog lib/data (hanya yang punya foto asli). */
export async function fetchAdminDestinations(): Promise<AdminDestination[]> {
  await delay(150)
  return getAdminDestinations()
}

/** Event dari katalog lib/data. */
export async function fetchAdminEvents(): Promise<AdminCulturalEvent[]> {
  await delay(150)
  return getAdminEvents()
}

export function fetchAdminReviews(): Promise<AdminReview[]> {
  return adminRequest<AdminReview[]>("/reviews")
}