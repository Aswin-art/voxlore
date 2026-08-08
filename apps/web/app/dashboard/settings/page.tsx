import { Settings01Icon } from "@hugeicons/core-free-icons"
import { AdminSectionView } from "@/features/admin/components/admin-section-view"

export const metadata = {
  title: "Settings | Voxlore Admin",
  description: "Kelola pengaturan operasional Voxlore.",
}

export default function AdminSettingsPage() {
  return (
    <AdminSectionView
      config={{
        title: "Settings",
        description: "Periksa pengaturan studio sebelum perubahan operasional diterapkan.",
        icon: Settings01Icon,
        summary: "Area konfigurasi yang tersedia untuk pemeriksaan admin.",
        rows: [
          { label: "Profil studio", detail: "Nama, logo, dan informasi kontak admin", status: "Tersedia" },
          { label: "Moderasi konten", detail: "Aturan antrean ulasan dan publikasi", status: "Tersedia" },
          { label: "Notifikasi operasional", detail: "Penerima dan kanal pemberitahuan admin", status: "Tersedia" },
        ],
      }}
    />
  )
}
