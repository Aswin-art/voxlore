import { Compass01Icon } from "@hugeicons/core-free-icons"
import { AdminSectionView } from "@/features/admin/components/admin-section-view"

export const metadata = {
  title: "Destinations | Voxlore Admin",
  description: "Kelola destinasi dan panduan audio Voxlore.",
}

export default function AdminDestinationsPage() {
  return (
    <AdminSectionView
      config={{
        title: "Destinations",
        description: "Periksa destinasi budaya, lokasi, dan kesiapan panduan audio.",
        icon: Compass01Icon,
        summary: "Destinasi yang perlu ditinjau sebelum dipublikasikan.",
        rows: [
          { label: "Candi Prambanan", detail: "Sleman · 12 panduan audio", status: "Aktif" },
          { label: "Candi Borobudur", detail: "Magelang · 18 panduan audio", status: "Aktif" },
          { label: "Wayang Kulit Purwa", detail: "Surakarta · 8 panduan audio", status: "Draft review" },
        ],
      }}
    />
  )
}
