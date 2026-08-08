import { StarIcon } from "@hugeicons/core-free-icons"
import { AdminSectionView } from "@/features/admin/components/admin-section-view"

export const metadata = {
  title: "Reviews | Voxlore Admin",
  description: "Moderasi ulasan pengunjung Voxlore.",
}

export default function AdminReviewsPage() {
  return (
    <AdminSectionView
      config={{
        title: "Reviews",
        description: "Tinjau apresiasi pengunjung sebelum tampil di halaman publik.",
        icon: StarIcon,
        summary: "Ulasan terbaru dalam antrean moderasi.",
        rows: [
          { label: "Budi Santoso", detail: "Candi Prambanan · rating 5 · 10 menit lalu", status: "Perlu moderasi" },
          { label: "Siti Rahmawati", detail: "Tari Kecak Uluwatu · rating 4 · 45 menit lalu", status: "Perlu moderasi" },
        ],
      }}
    />
  )
}
