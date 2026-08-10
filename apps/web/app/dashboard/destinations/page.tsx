"use client"

import { Compass01Icon } from "@hugeicons/core-free-icons"
import { useAdminDestinations } from "@/features/admin/hooks/use-admin"
import { AdminSectionView } from "@/features/admin/components/admin-section-view"
import type { AdminSectionConfig } from "@/features/admin/components/admin-section-view"

export default function AdminDestinationsPage() {
  const { destinations = [] } = useAdminDestinations()
  const rows = destinations.map((destination) => ({
    label: destination.name,
    detail: `${destination.location} · ${destination.category}`,
    status: destination.status,
  }))
  const config: AdminSectionConfig = {
    title: "Destinations",
    description: "Periksa destinasi budaya, lokasi, dan kesiapan panduan audio.",
    icon: Compass01Icon,
    summary: "Seluruh destinasi dari API katalog.",
    rows,
  }
  return <AdminSectionView config={config} />
}
