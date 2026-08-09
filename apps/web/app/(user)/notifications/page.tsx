"use client"

import { Suspense, useState } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  Notification01Icon,
  TickDouble01Icon,
  Clock01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import ErrorBoundary from "@/components/error-boundary"
import { Skeleton } from "@workspace/ui/components/skeleton"

export interface NotificationItem {
  id: string
  title: string
  message: string
  timestamp: string
  isRead: boolean
  actionUrl?: string
  actionLabel?: string
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Audio Guide Baru Dirilis! 🎧",
    message: "Kisah epik 'Tari Pendet & Keagungan Pura Besakih' kini tersedia dalam mode HD Suara Jernih.",
    timestamp: "10 min yang lalu",
    isRead: false,
    actionUrl: "/downloads",
    actionLabel: "Buka Unduhan Audio",
  },
  {
    id: "notif-2",
    title: "Diskon 20% Paket Langganan Tahunan 🎟️",
    message: "Nikmati akses tanpa batas ke 500+ audio cerita rakyat Nusantara dengan hemat langganan Heritage Pass Tahunan.",
    timestamp: "2 jam yang lalu",
    isRead: false,
    actionUrl: "/packages",
    actionLabel: "Lihat Paket Berlangganan",
  },
  {
    id: "notif-3",
    title: "Pembaruan Keamanan Akun 🔒",
    message: "Kata sandi akun kamu telah diperbarui secara sukses. Jika ini bukan kamu, segera amankan akun.",
    timestamp: "Kemarin, 14:30",
    isRead: true,
    actionUrl: "/security",
    actionLabel: "Menu Ubah Kata Sandi",
  },
  {
    id: "notif-4",
    title: "Festival Budaya Borobudur Night 🌌",
    message: "Tiket presale VIP event narasi malam candi Borobudur sudah dibuka khusus untuk pengguna Voxlore.",
    timestamp: "2 hari yang lalu",
    isRead: true,
  },
]

function NotificationsPageSkeleton() {
  return (
    <div className="flex flex-col pb-28 relative w-full min-w-0">
      <header className="sticky top-0 z-30 bg-card p-4 sm:p-5 border-b border-border/60 shadow-xs flex items-center gap-3 w-full min-w-0">
        <Skeleton className="w-9 h-9 rounded-2xl" />
        <div className="flex flex-col gap-2 min-w-0">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
      </header>
      <div className="p-4 sm:p-5 flex flex-col gap-3 w-full">
        <Skeleton className="h-24 w-full rounded-3xl" />
        <Skeleton className="h-24 w-full rounded-3xl" />
        <Skeleton className="h-24 w-full rounded-3xl" />
      </div>
    </div>
  )
}

export default function NotificationsPage() {
  return (
    <Suspense fallback={<NotificationsPageSkeleton />}>
      <ErrorBoundary label="Notifikasi">
        <NotificationsPageContent />
      </ErrorBoundary>
    </Suspense>
  )
}

function NotificationsPageContent() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS)
  const [toast, setToast] = useState<string | null>(null)

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })))
    setToast("Semua notifikasi ditandai telah dibaca 🟢")
    setTimeout(() => setToast(null), 3000)
  }

  const handleOpenDetail = (id: string) => {
    // Automatically mark as read when clicking
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    )
    router.push(`/notifications/${id}`)
  }

  return (
    <div className="flex flex-col pb-28 relative w-full min-w-0">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-4 left-4 right-4 max-w-sm mx-auto z-50 p-3 bg-primary text-primary-foreground text-xs font-bold rounded-2xl flex items-center justify-between shadow-2xl animate-in fade-in slide-in-from-top-2">
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="opacity-70 hover:opacity-100 ml-2 cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-30 bg-card p-4 sm:p-5 border-b border-border/60 shadow-xs flex items-center justify-between gap-3 w-full min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-9 h-9 rounded-2xl border border-border bg-background flex items-center justify-center text-foreground hover:bg-card transition-colors cursor-pointer shrink-0"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
          </button>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold text-foreground tracking-tight truncate">
                Notifikasi
              </h1>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-black">
                  {unreadCount} Baru
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground truncate">
              Informasi event, rilis audio guide &amp; akun
            </span>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllAsRead}
            className="p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors flex items-center gap-1.5 text-xs font-extrabold shrink-0 cursor-pointer"
            title="Tandai Semua Dibaca"
          >
            <HugeiconsIcon icon={TickDouble01Icon} className="w-5 h-5 text-primary" />
            <span className="hidden sm:inline">Tandai Dibaca</span>
          </button>
        )}
      </header>

      {/* Main Content Body */}
      <div className="p-4 sm:p-5 flex flex-col gap-3 w-full">
        {notifications.length === 0 ? (
          <div className="p-10 text-center bg-card rounded-3xl border border-border flex flex-col items-center justify-center gap-2 mt-4 w-full">
            <HugeiconsIcon icon={Notification01Icon} className="w-10 h-10 text-muted-foreground/30" />
            <span className="text-xs font-extrabold text-foreground">Tidak Ada Notifikasi</span>
            <span className="text-[11px] text-muted-foreground max-w-xs">
              Semua pemberitahuan kamu telah dibaca atau belum ada notifikasi baru.
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full">
            {notifications.map((item) => {
              const isUnread = !item.isRead

              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenDetail(item.id)}
                  className={`p-4 rounded-3xl border flex items-start gap-3.5 transition-all duration-200 cursor-pointer shadow-2xs ${
                    isUnread
                      ? "bg-primary/5 border-primary/40 ring-1 ring-primary/20"
                      : "bg-card border-border hover:border-border/80"
                  }`}
                >
                  {/* Notification Content Details */}
                  <div className="flex flex-col flex-1 min-w-0 gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xs font-extrabold text-foreground truncate">
                        {item.title}
                      </h3>
                      {isUnread && (
                        <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 ring-4 ring-primary/20" />
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {item.message}
                    </p>

                    <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-border/40">
                      <div className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground">
                        <HugeiconsIcon icon={Clock01Icon} className="w-3 h-3" />
                        <span>{item.timestamp}</span>
                      </div>

                      <span className="text-[11px] font-extrabold text-primary flex items-center gap-0.5">
                        Detail <HugeiconsIcon icon={ArrowRight01Icon} className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
