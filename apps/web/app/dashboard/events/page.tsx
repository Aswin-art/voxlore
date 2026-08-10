"use client"

import { Calendar03Icon } from "@hugeicons/core-free-icons"
import { useAdminEvents } from "@/features/admin/hooks/use-admin"
import { AdminSectionView } from "@/features/admin/components/admin-section-view"
import type { AdminSectionConfig } from "@/features/admin/components/admin-section-view"

export default function AdminEventsPage() {
  const { events = [] } = useAdminEvents()
  const rows = events.map((event) => ({
    label: event.title,
    detail: `${event.date} · ${event.location}`,
    status: event.status,
  }))
  const config: AdminSectionConfig = {
    title: "Events",
    description: "Atur jadwal acara budaya dan informasi penyelenggaranya.",
    icon: Calendar03Icon,
    summary: "Seluruh acara adat dan festival dari API katalog.",
    rows,
  }
  return <AdminSectionView config={config} />
}
