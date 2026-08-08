import { Metadata } from "next"
import { AuthCard } from "@/features/auth/components/auth-card"

export const metadata: Metadata = {
  title: "Masuk",
  description:
    "Masuk ke akun Voxlore Anda untuk menikmati panduan audio sinematik dwibahasa dan riwayat eksplorasi warisan budaya Nusantara.",
  alternates: {
    canonical: "/login",
  },
  openGraph: {
    title: "Masuk ke Voxlore - Panduan Audio Warisan Budaya",
    description:
      "Masuk ke akun Voxlore Anda untuk menyimpan destinasi budaya favorit dan mendengarkan narasi sejarah Nusantara.",
    url: "/login",
  },
  twitter: {
    title: "Masuk ke Voxlore - Panduan Audio Warisan Budaya",
    description:
      "Masuk ke akun Voxlore Anda untuk menyimpan destinasi budaya favorit dan mendengarkan narasi sejarah Nusantara.",
  },
}

export default function LoginPage() {
  return <AuthCard mode="login" />
}
