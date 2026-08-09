import { UserGroupIcon } from "@hugeicons/core-free-icons"
import { PROVINCES, REGIONS } from "@/lib/data"
import { AdminSectionView } from "@/features/admin/components/admin-section-view"
import type { AdminSectionConfig } from "@/features/admin/components/admin-section-view"

export const metadata = {
  title: "Users | Voxlore Admin",
  description: "Tinjau pengguna dan komunitas Voxlore.",
}

export default function AdminUsersPage() {
  const rows = REGIONS.map((region) => ({
    label: `Komunitas ${region}`,
    detail: `${PROVINCES.length} provinsi tercakup`,
    status: "Aktif",
  }))

  const config: AdminSectionConfig = {
    title: "Users",
    description: "Pantau akun komunitas dan akses mereka ke pengalaman Voxlore.",
    icon: UserGroupIcon,
    summary: "Jangkauan komunitas berdasarkan wilayah budaya Nusantara.",
    rows,
  }

  return <AdminSectionView config={config} />
}
