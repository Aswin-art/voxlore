import { Metadata } from "next"
import { AuthCard } from "@/features/auth/components/auth-card"

export const metadata: Metadata = {
  title: "Daftar",
  description:
    "Buat akun gratis di Voxlore untuk mulai menyimpan panduan audio favoritmu dan menjelajahi warisan sejarah Nusantara.",
  alternates: {
    canonical: "/register",
  },
  openGraph: {
    title: "Daftar Akun Voxlore - Panduan Audio Warisan Budaya",
    description:
      "Daftar akun gratis Voxlore untuk menjelajahi cerita sejarah dan musik etnik sinematik Nusantara.",
    url: "/register",
  },
  twitter: {
    title: "Daftar Akun Voxlore - Panduan Audio Warisan Budaya",
    description:
      "Daftar akun gratis Voxlore untuk menjelajahi cerita sejarah dan musik etnik sinematik Nusantara.",
  },
}

export default function RegisterPage() {
  return <AuthCard mode="register" />
}
