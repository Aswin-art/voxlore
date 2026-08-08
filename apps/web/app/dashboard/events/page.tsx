import { Calendar03Icon } from "@hugeicons/core-free-icons"
import { AdminSectionView } from "@/features/admin/components/admin-section-view"

export const metadata = {
  title: "Events | Voxlore Admin",
  description: "Kelola kalender acara budaya Voxlore.",
}

export default function AdminEventsPage() {
  return (
    <AdminSectionView
      config={{
        title: "Events",
        description: "Atur jadwal acara budaya dan informasi penyelenggaranya.",
        icon: Calendar03Icon,
        summary: "Acara mendatang yang membutuhkan pemeriksaan operasional.",
        rows: [
          { label: "Upacara Yadnya Kasada Bromo", detail: "14–16 Agustus 2026 · Probolinggo", status: "Mendatang" },
          { label: "Festival Sekaten Surakarta", detail: "20–27 September 2026 · Surakarta", status: "Mendatang" },
          { label: "Pekan Seni Budaya Bali 2026", detail: "05–12 Oktober 2026 · Denpasar", status: "Persiapan" },
        ],
      }}
    />
  )
}
