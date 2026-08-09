import { Calendar03Icon } from "@hugeicons/core-free-icons"
import { ALL_FESTIVALS } from "@/lib/data"
import { AdminSectionView } from "@/features/admin/components/admin-section-view"
import type { AdminSectionConfig } from "@/features/admin/components/admin-section-view"

export const metadata = {
  title: "Events | Voxlore Admin",
  description: "Kelola kalender acara budaya Voxlore.",
}

export default function AdminEventsPage() {
  const rows = ALL_FESTIVALS.map((f) => ({
    label: f.title,
    detail: `${f.date} · ${f.location}`,
    status: "Mendatang",
  }))

  const config: AdminSectionConfig = {
    title: "Events",
    description: "Atur jadwal acara budaya dan informasi penyelenggaranya.",
    icon: Calendar03Icon,
    summary: "Seluruh acara adat & festival dari kalender budaya 2026.",
    rows,
  }

  return <AdminSectionView config={config} />
}
