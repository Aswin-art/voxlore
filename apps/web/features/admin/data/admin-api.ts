/** Typed API client for the admin dashboard. */
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

async function adminRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`/api/admin${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init.headers },
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

export function updateAdminReviewStatus(id: string, status: string) {
  return adminRequest<AdminReview>(`/reviews/${encodeURIComponent(id)}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  })
}

export function deleteAdminReview(id: string) {
  return adminRequest<{ success: boolean }>(`/reviews/${encodeURIComponent(id)}`, {
    method: "DELETE",
  })
}

export function createAdminDestination(input: Partial<AdminDestination>) {
  return adminRequest<AdminDestination>("/destinations", {
    method: "POST",
    body: JSON.stringify(input),
  })
}

export function updateAdminDestination(id: string, input: Partial<AdminDestination>) {
  return adminRequest<AdminDestination>(`/destinations/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(input),
  })
}

export function deleteAdminDestination(id: string) {
  return adminRequest<{ success: boolean }>(`/destinations/${encodeURIComponent(id)}`, {
    method: "DELETE",
  })
}

export function createAdminEvent(input: Partial<AdminCulturalEvent>) {
  return adminRequest<AdminCulturalEvent>("/events", {
    method: "POST",
    body: JSON.stringify(input),
  })
}

export function updateAdminEvent(id: string, input: Partial<AdminCulturalEvent>) {
  return adminRequest<AdminCulturalEvent>(`/events/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(input),
  })
}

export function deleteAdminEvent(id: string) {
  return adminRequest<{ success: boolean }>(`/events/${encodeURIComponent(id)}`, {
    method: "DELETE",
  })
}