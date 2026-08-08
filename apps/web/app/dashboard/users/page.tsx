import { UserGroupIcon } from "@hugeicons/core-free-icons"
import { AdminSectionView } from "@/features/admin/components/admin-section-view"

export const metadata = {
  title: "Users | Voxlore Admin",
  description: "Tinjau pengguna dan komunitas Voxlore.",
}

export default function AdminUsersPage() {
  return (
    <AdminSectionView
      config={{
        title: "Users",
        description: "Pantau akun komunitas dan akses mereka ke pengalaman Voxlore.",
        icon: UserGroupIcon,
        summary: "Ringkasan akun yang baru memerlukan perhatian admin.",
        rows: [
          { label: "Komunitas wisatawan", detail: "Akun terverifikasi · akses standar", status: "Aktif" },
          { label: "Kontributor budaya", detail: "Akun terverifikasi · akses editor", status: "Aktif" },
          { label: "Permintaan akses baru", detail: "Perlu pemeriksaan identitas dan peran", status: "Perlu tinjau" },
        ],
      }}
    />
  )
}
