"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  Clock01Icon,
  Notification01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"

export interface NotificationDetailData {
  id: string
  title: string
  message: string
  fullContent: string
  timestamp: string
  category: string
  actionUrl?: string
  actionLabel?: string
}

const NOTIFICATIONS_DATA: Record<string, NotificationDetailData> = {
  "notif-1": {
    id: "notif-1",
    title: "Audio Guide Baru Dirilis! 🎧",
    message: "Kisah epik 'Tari Pendet & Keagungan Pura Besakih' kini tersedia dalam mode HD Suara Jernih.",
    fullContent:
      "Kami dengan bangga meluncurkan trek audio guide terbaru untuk 'Tari Pendet & Keagungan Pura Besakih'. Nikmati penuturan narasi naratif dari budayawan lokal dengan kualitas audio HD 320kbps. Kamu juga dapat mengunduh audio ini untuk didengarkan secara luring saat berada di lokasi.",
    timestamp: "10 min yang lalu",
    category: "Rilis Audio",
    actionUrl: "/downloads",
    actionLabel: "Buka Unduhan Audio",
  },
  "notif-2": {
    id: "notif-2",
    title: "Diskon 20% Paket Langganan Tahunan 🎟️",
    message: "Nikmati akses tanpa batas ke 500+ audio cerita rakyat Nusantara dengan hemat langganan Heritage Pass Tahunan.",
    fullContent:
      "Dapatkan promo terbatas potongan 20% khusus langganan Heritage Pass Tahunan. Buka akses tanpa batas ke seluruh direktori audio guide candi, tarian tradisional, museum, dan cerita rakyat di seluruh pelosok Nusantara tanpa jeda iklan.",
    timestamp: "2 jam yang lalu",
    category: "Promo & Event",
    actionUrl: "/packages",
    actionLabel: "Lihat Paket Berlangganan",
  },
  "notif-3": {
    id: "notif-3",
    title: "Pembaruan Keamanan Akun 🔒",
    message: "Kata sandi akun kamu telah diperbarui secara sukses. Jika ini bukan kamu, segera amankan akun.",
    fullContent:
      "Sistem kami mendeteksi perubahan kata sandi pada akun kamu. Jika kamu melakukan perubahan ini, tidak ada tindakan lebih lanjut yang diperlukan. Jika ini bukan kamu, segera perbarui kata sandi kamu melalui menu Ubah Kata Sandi.",
    timestamp: "Kemarin, 14:30",
    category: "Keamanan Akun",
    actionUrl: "/security",
    actionLabel: "Menu Ubah Kata Sandi",
  },
  "notif-4": {
    id: "notif-4",
    title: "Festival Budaya Borobudur Night 🌌",
    message: "Tiket presale VIP event narasi malam candi Borobudur sudah dibuka khusus untuk pengguna Voxlore.",
    fullContent:
      "Sambut gelaran malam seni dan pertunjukan pertunjukan cahaya epik Borobudur Night. Pengguna Voxlore mendapatkan akses jalur khusus presale tiket VIP dan pemandu suara eksklusif selama gelaran festival berlangsung.",
    timestamp: "2 hari yang lalu",
    category: "Event Spesial",
  },
}

export default function NotificationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  const resolvedParams = use(params)
  const notificationId = resolvedParams.id
  const notif = NOTIFICATIONS_DATA[notificationId]

  if (!notif) {
    return (
      <div className="flex flex-col pb-28 relative w-full min-w-0">
        <header className="sticky top-0 z-30 bg-card p-4 sm:p-5 border-b border-border/60 shadow-xs flex items-center gap-3 w-full min-w-0">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-9 h-9 rounded-2xl border border-border bg-background flex items-center justify-center text-foreground hover:bg-card transition-colors cursor-pointer shrink-0"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-extrabold text-foreground tracking-tight truncate">
            Notifikasi Tidak Ditemukan
          </h1>
        </header>

        <div className="p-10 text-center bg-card rounded-3xl border border-border flex flex-col items-center justify-center gap-2 m-4">
          <HugeiconsIcon icon={Notification01Icon} className="w-10 h-10 text-muted-foreground/30" />
          <span className="text-xs font-extrabold text-foreground">Notifikasi Tidak Ada</span>
          <span className="text-[11px] text-muted-foreground">
            Pemberitahuan yang kamu cari tidak ditemukan atau telah dihapus.
          </span>
          <button
            onClick={() => router.push("/notifications")}
            className="mt-3 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-extrabold"
          >
            Kembali ke Notifikasi
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col pb-28 relative w-full min-w-0">
      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-30 bg-card p-4 sm:p-5 border-b border-border/60 shadow-xs flex items-center gap-3 w-full min-w-0">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-9 h-9 rounded-2xl border border-border bg-background flex items-center justify-center text-foreground hover:bg-card transition-colors cursor-pointer shrink-0"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
        </button>
        <div className="flex flex-col min-w-0">
          <h1 className="text-lg font-extrabold text-foreground tracking-tight truncate">
            Detail Notifikasi
          </h1>
          <span className="text-xs text-muted-foreground truncate">
            Informasi lengkap pemberitahuan Voxlore
          </span>
        </div>
      </header>

      {/* Main Detail Body Content */}
      <div className="p-4 sm:p-5 flex flex-col gap-4 w-full">
        {/* Timestamp */}
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-semibold">
          <HugeiconsIcon icon={Clock01Icon} className="w-3.5 h-3.5" />
          <span>{notif.timestamp}</span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-black text-foreground leading-snug">
          {notif.title}
        </h2>

        <div className="h-px bg-border/60 w-full" />

        {/* Full Narrative Content */}
        <div className="text-xs sm:text-sm text-foreground leading-relaxed font-medium space-y-3">
          <p>{notif.fullContent}</p>
          <p className="text-muted-foreground italic text-[11px]">
            Diterima secara otomatis oleh sistem pemberitahuan akun Voxlore kamu.
          </p>
        </div>

        {/* Action Link Button */}
        {notif.actionUrl && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => router.push(notif.actionUrl!)}
              className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-extrabold text-xs hover:opacity-90 transition-opacity shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{notif.actionLabel || "Buka Fitur"}</span>
              <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
