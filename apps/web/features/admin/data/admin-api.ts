/**
 * Data-access layer admin dashboard.
 *
 * Sumber data BACA: katalog `lib/data` (SAMA dengan halaman explore) lewat
 * `admin-catalog.ts`, sehingga jumlah/nama/lokasi/gambar selalu sinkron.
 * Backend admin API masih tersedia untuk operasi tulis (CRUD) masa depan.
 */
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
    credentials: "include",
  })

  if (!res.ok) {
    throw new Error(`Gagal memuat data admin (${res.status})`)
  }

  return res.json() as Promise<T>
}

export function fetchAdminStats(): Promise<AdminStatsResponse> {
  return adminRequest<AdminStatsResponse>("/stats")
}

export function fetchAdminDestinations(): Promise<AdminDestination[]> {
  return adminRequest<AdminDestination[]>("/destinations")
}

export function fetchAdminEvents(): Promise<AdminCulturalEvent[]> {
  return adminRequest<AdminCulturalEvent[]>("/events")
}

export function fetchAdminReviews(): Promise<AdminReview[]> {
  return adminRequest<AdminReview[]>("/reviews")
}