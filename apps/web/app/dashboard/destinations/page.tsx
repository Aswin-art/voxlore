import { Compass01Icon } from "@hugeicons/core-free-icons"
import { ALL_DESTINATIONS } from "@/lib/data"
import { hasCatalogImage } from "@/features/admin/data/admin-catalog"
import { AdminSectionView } from "@/features/admin/components/admin-section-view"
import type { AdminSectionConfig } from "@/features/admin/components/admin-section-view"

export const metadata = {
  title: "Destinations | Voxlore Admin",
  description: "Kelola destinasi dan panduan audio Voxlore.",
}

export default function AdminDestinationsPage() {
  const rows = ALL_DESTINATIONS.filter((d) => hasCatalogImage(d.image)).map(
    (d) => ({
      label: d.title,
      detail: `${d.location} · ${d.category}`,
      status: "Aktif",
    }),
  )

  const config: AdminSectionConfig = {
    title: "Destinations",
    description: "Periksa destinasi budaya, lokasi, dan kesiapan panduan audio.",
    icon: Compass01Icon,
    summary: "Seluruh destinasi dari katalog yang sudah memiliki panduan audio.",
    rows,
  }

  return <AdminSectionView config={config} />
}
