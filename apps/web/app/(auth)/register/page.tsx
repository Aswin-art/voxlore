import { Metadata } from "next"
import { AuthCard } from "@/features/auth/components/auth-card"

export const metadata: Metadata = {
  title: "Daftar | Voxlore - Panduan Audio Warisan Budaya",
  description: "Daftar akun gratis Voxlore untuk menjelajahi cerita sejarah dan musik etnik sinematik Nusantara.",
}

export default function RegisterPage() {
  return <AuthCard mode="register" />
}
