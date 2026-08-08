import { Metadata } from "next"
import { AuthCard } from "@/features/auth/components/auth-card"

export const metadata: Metadata = {
  title: "Masuk | Voxlore - Panduan Audio Warisan Budaya",
  description: "Masuk ke akun Voxlore Anda untuk menikmati panduan audio sinematik warisan budaya Nusantara.",
}

export default function LoginPage() {
  return <AuthCard mode="login" />
}
