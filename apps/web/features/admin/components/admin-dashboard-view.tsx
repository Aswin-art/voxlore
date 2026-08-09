"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Compass01Icon,
  Calendar03Icon,
  UserGroupIcon,
  HeadphonesIcon,
  Add01Icon,
  Search01Icon,
  FilterIcon,
  StarIcon,
  CheckmarkCircle02Icon,
  Cancel01Icon,
  Location01Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons"
import ErrorBoundary from "@/components/error-boundary"
import {
  useAdminStats,
  useAdminDestinations,
  useAdminEvents,
  useAdminReviews,
} from "../hooks/use-admin"
import type { AdminDestination } from "../data/admin-api"

/** Map nama ikon (string) dari respons API ke komponen Hugeicons. */
const STAT_ICONS: Record<string, typeof Compass01Icon> = {
  Compass01Icon,
  Calendar03Icon,
  UserGroupIcon,
  HeadphonesIcon,
}

/* ------------------------------------------------------------------ */
/* Fallback: skeleton (pulse) per seksi                                 */
/* ------------------------------------------------------------------ */

function StatCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="p-5 sm:p-6 bg-white/90 rounded-2xl sm:rounded-3xl border border-[#1E2229]/10 shadow-2xs flex flex-col justify-between space-y-4 animate-pulse"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="w-24 h-3 rounded-full bg-[#1E2229]/10" />
            <div className="w-10 h-10 rounded-xl bg-[#1E2229]/10" />
          </div>
          <div className="space-y-2">
            <div className="w-20 h-7 rounded-lg bg-[#1E2229]/10" />
            <div className="w-28 h-4 rounded-full bg-[#1E2229]/10" />
          </div>
        </div>
      ))}
    </div>
  )
}

function DestinationsTableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#1E2229]/10 bg-white">
      <div className="flex items-center gap-3 p-4 border-b border-[#1E2229]/10 animate-pulse">
        <div className="w-10 h-10 rounded-xl bg-[#1E2229]/10" />
        <div className="flex-1 space-y-1.5">
          <div className="w-1/3 h-3 rounded-full bg-[#1E2229]/10" />
          <div className="w-1/4 h-2 rounded-full bg-[#1E2229]/10" />
        </div>
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-4 border-b border-[#1E2229]/10 animate-pulse"
        >
          <div className="w-10 h-10 rounded-xl bg-[#1E2229]/10" />
          <div className="w-40 h-3 rounded-full bg-[#1E2229]/10" />
          <div className="w-32 h-3 rounded-full bg-[#1E2229]/10" />
          <div className="w-24 h-3 rounded-full bg-[#1E2229]/10" />
        </div>
      ))}
    </div>
  )
}

function EventsTableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#1E2229]/10 bg-white">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-4 border-b border-[#1E2229]/10 animate-pulse"
        >
          <div className="w-52 h-3 rounded-full bg-[#1E2229]/10" />
          <div className="w-32 h-3 rounded-full bg-[#1E2229]/10" />
          <div className="w-40 h-3 rounded-full bg-[#1E2229]/10" />
          <div className="w-24 h-3 rounded-full bg-[#1E2229]/10" />
        </div>
      ))}
    </div>
  )
}

function ReviewsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="p-5 rounded-2xl border border-[#1E2229]/10 bg-white space-y-4 shadow-2xs animate-pulse"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1E2229]/10" />
            <div className="flex-1 space-y-1.5">
              <div className="w-32 h-3 rounded-full bg-[#1E2229]/10" />
              <div className="w-24 h-2 rounded-full bg-[#1E2229]/10" />
            </div>
          </div>
          <div className="w-full h-16 rounded-xl bg-[#1E2229]/5" />
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Fallback: error per seksi dengan tombol retry                        */
/* ------------------------------------------------------------------ */

function SectionErrorFallback({
  label,
  onRetry,
}: {
  label: string
  onRetry: () => void
}) {
  return (
    <div
      role="alert"
      className="w-full rounded-2xl border border-[#1E2229]/10 bg-white p-8 text-center flex flex-col items-center justify-center gap-3"
    >
      <HugeiconsIcon icon={Cancel01Icon} className="w-7 h-7 text-[#1E2229]/30" />
      <span className="text-xs font-extrabold text-[#1E2229]">
        Gagal memuat {label}
      </span>
      <span className="text-[11px] text-[#1E2229]/60">
        Terjadi kendala saat mengambil data. Silakan coba lagi.
      </span>
      <button
        type="button"
        onClick={onRetry}
        className="mt-1 rounded-full bg-[#1E2229] px-5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
      >
        Coba Lagi
      </button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* UI: Tabel Destinasi                                                 */
/* ------------------------------------------------------------------ */

function DestinationsPanel({ destinations }: { destinations: AdminDestination[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#1E2229]/10">
      <table className="w-full text-left text-[0.8125rem] leading-[1.35] text-[#1E2229]">
        <thead className="bg-[#1E2229]/5 border-b border-[#1E2229]/10 text-[0.6875rem] font-extrabold uppercase tracking-[0.08em] text-[#1E2229]/70">
          <tr>
            <th className="py-3.5 px-4">Destinasi Budaya</th>
            <th className="py-3.5 px-4">Kategori &amp; Lokasi</th>
            <th className="py-3.5 px-4">Jumlah Audio Spot</th>
            <th className="py-3.5 px-4">Harga Audio Pass</th>
            <th className="py-3.5 px-4">Rating &amp; Pendengar</th>
            <th className="py-3.5 px-4">Status Publis</th>
            <th className="py-3.5 px-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1E2229]/10 bg-white">
          {destinations.map((dest) => (
            <tr key={dest.id} className="hover:bg-vox-cream/40 transition-colors">
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#1E2229]/10">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-sm text-[#1E2229]">
                      {dest.name}
                    </span>
                    <span className="text-[10px] text-[#1E2229]/50 font-mono">
                      ID: {dest.id}
                    </span>
                  </div>
                </div>
              </td>

              <td className="py-3.5 px-4">
                <div className="flex flex-col">
                  <span className="font-bold text-xs">{dest.category}</span>
                  <span className="text-[11px] text-[#1E2229]/60">{dest.location}</span>
                </div>
              </td>

              <td className="py-3.5 px-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1E2229]/5 font-extrabold text-xs">
                  <HugeiconsIcon icon={HeadphonesIcon} className="w-3.5 h-3.5" />
                  <span>{dest.audioCount} Spot</span>
                </div>
              </td>

              <td className="py-3.5 px-4 font-black text-xs text-[#1E2229]">
                {dest.passPrice}
              </td>

              <td className="py-3.5 px-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 font-bold text-amber-600">
                    <HugeiconsIcon icon={StarIcon} className="w-3.5 h-3.5 fill-current" />
                    <span>{dest.rating}</span>
                  </div>
                  <span className="text-[11px] text-[#1E2229]/60">
                    ({dest.listeners})
                  </span>
                </div>
              </td>

              <td className="py-3.5 px-4">
                <span
                  className={`inline-flex h-6 min-w-[5.25rem] items-center justify-center gap-1 whitespace-nowrap rounded-full border px-2.5 text-[10px] font-bold ${
                    dest.status === "Aktif"
                      ? "bg-emerald-500/10 text-emerald-800 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-800 border-amber-500/20"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      dest.status === "Aktif" ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                  />
                  {dest.status}
                </span>
              </td>

              <td className="py-3.5 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/culture/${dest.id}`}
                    className="px-2.5 py-1 rounded-lg bg-[#1E2229]/5 hover:bg-[#1E2229]/10 text-[#1E2229] font-bold text-[11px] transition-colors"
                  >
                    Pratinjau
                  </Link>
                  <button className="px-2.5 py-1 rounded-lg bg-[#1E2229] hover:bg-[#1E2229]/90 text-white font-bold text-[11px] transition-colors cursor-pointer">
                    Sunting
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* UI: Tabel Event                                                     */
/* ------------------------------------------------------------------ */

function EventsPanel({
  events,
}: {
  events: Array<{
    id: string
    title: string
    date: string
    location: string
    organizer: string
    status: string
    attendees: string
  }>
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#1E2229]/10">
      <table className="w-full text-left text-[0.8125rem] leading-[1.35] text-[#1E2229]">
        <thead className="bg-[#1E2229]/5 border-b border-[#1E2229]/10 text-[0.6875rem] font-extrabold uppercase tracking-[0.08em] text-[#1E2229]/70">
          <tr>
            <th className="py-3.5 px-4">Nama Acara Adat &amp; Festival</th>
            <th className="py-3.5 px-4">Tanggal Pelaksanaan</th>
            <th className="py-3.5 px-4">Lokasi Situs</th>
            <th className="py-3.5 px-4">Penyelenggara</th>
            <th className="py-3.5 px-4">Estimasi Pengunjung</th>
            <th className="py-3.5 px-4">Status Schedule</th>
            <th className="py-3.5 px-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1E2229]/10 bg-white">
          {events.map((evt) => (
            <tr key={evt.id} className="hover:bg-vox-cream/40 transition-colors">
              <td className="py-3.5 px-4 font-extrabold text-sm text-[#1E2229]">
                {evt.title}
              </td>

              <td className="py-3.5 px-4 font-bold text-xs">
                <div className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={Clock01Icon} className="w-3.5 h-3.5 text-[#1E2229]/50" />
                  <span>{evt.date}</span>
                </div>
              </td>

              <td className="py-3.5 px-4">
                <div className="flex items-center gap-1.5 text-xs">
                  <HugeiconsIcon icon={Location01Icon} className="w-3.5 h-3.5 text-destructive" />
                  <span>{evt.location}</span>
                </div>
              </td>

              <td className="py-3.5 px-4 font-medium text-xs text-[#1E2229]/70">
                {evt.organizer}
              </td>

              <td className="py-3.5 px-4 font-bold text-xs">
                {evt.attendees}
              </td>

              <td className="py-3.5 px-4">
                <span className="inline-flex h-6 min-w-[5.25rem] items-center justify-center gap-1 whitespace-nowrap rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 text-[10px] font-bold text-blue-800">
                  {evt.status}
                </span>
              </td>

              <td className="py-3.5 px-4 text-right">
                <button className="px-2.5 py-1 rounded-lg bg-[#1E2229] hover:bg-[#1E2229]/90 text-white font-bold text-[11px] transition-colors cursor-pointer">
                  Edit Jadwal
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* UI: Moderasi Ulasan                                                 */
/* ------------------------------------------------------------------ */

function ReviewsPanel({
  reviews,
}: {
  reviews: Array<{
    id: string
    user: string
    destination: string
    rating: number
    comment: string
    time: string
  }>
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {reviews.map((rev) => (
        <div
          key={rev.id}
          className="p-5 rounded-2xl border border-[#1E2229]/10 bg-white flex flex-col justify-between space-y-4 shadow-2xs"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#1E2229] text-white flex items-center justify-center font-bold text-xs">
                  {rev.user.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xs text-[#1E2229]">
                    {rev.user}
                  </span>
                  <span className="text-[10px] text-[#1E2229]/60">
                    {rev.destination} • {rev.time}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                <HugeiconsIcon icon={StarIcon} className="w-3.5 h-3.5 fill-current" />
                <span>{rev.rating}.0</span>
              </div>
            </div>

            <p className="text-xs text-[#1E2229]/80 italic bg-vox-cream/50 p-3 rounded-xl border border-[#1E2229]/5">
              "{rev.comment}"
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1E2229]/10">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-700 font-bold text-xs transition-colors cursor-pointer">
              <HugeiconsIcon icon={Cancel01Icon} className="w-3.5 h-3.5" />
              <span>Tolak</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-3.5 h-3.5" />
              <span>Setujui &amp; Tampilkan</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Komponen utama                                                      */
/* ------------------------------------------------------------------ */

export function AdminDashboardView() {
  const [activeTab, setActiveTab] = useState<"destinations" | "events" | "reviews">("destinations")
  const [searchQuery, setSearchQuery] = useState("")

  const {
    stats,
    isPending: statsPending,
    isError: statsError,
    refetch: refetchStats,
  } = useAdminStats()
  const {
    destinations,
    isPending: destPending,
    isError: destError,
    refetch: refetchDestinations,
  } = useAdminDestinations()
  const {
    events,
    isPending: eventsPending,
    isError: eventsError,
    refetch: refetchEvents,
  } = useAdminEvents()
  const {
    reviews,
    isPending: reviewsPending,
    isError: reviewsError,
    refetch: refetchReviews,
  } = useAdminReviews()

  const statCards = stats?.stats ?? []
  const destinationsCount = destinations?.length ?? 0
  const eventsCount = events?.length ?? 0
  const reviewsCount = reviews?.length ?? 0

  return (
    <div className="min-w-0 space-y-8 pb-12">
      {/* Top Welcome Banner & Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 bg-white/80 rounded-3xl border border-[#1E2229]/10 shadow-2xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E2229]/5 border border-[#1E2229]/10 text-[#1E2229] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#1E2229]" />
            Panel Kontrol Administrator
          </div>
          <h2 className="text-[clamp(1.5rem,1.18rem+1.05vw,2.25rem)] font-extrabold leading-[1.1] tracking-tight text-[#1E2229]">
            Selamat Datang di Voxlore Studio
          </h2>
          <p className="max-w-2xl text-[clamp(0.8125rem,0.77rem+0.18vw,0.9375rem)] leading-[1.618] text-[#1E2229]/70">
            Kelola narasi budaya, rilis audio pass destinasi baru, atur kalender festival adat, dan moderasi apresiasi pengunjung.
          </p>
        </div>

        {/* Global Quick Action Buttons */}
        <div className="grid w-full grid-cols-1 gap-2.5 pt-2 sm:flex sm:w-auto sm:shrink-0 md:pt-0">
          <button className="flex min-w-0 items-center justify-center gap-2 px-4 h-11 rounded-xl bg-[#1E2229] text-white hover:bg-[#1E2229]/90 text-xs font-bold transition-colors duration-150 shadow-xs cursor-pointer">
            <HugeiconsIcon icon={Add01Icon} className="w-4 h-4 text-vox-cream" />
            <span>Tambah Destinasi Baru</span>
          </button>

          <button className="flex min-w-0 items-center justify-center gap-2 px-4 h-11 rounded-xl bg-white text-[#1E2229] border border-[#1E2229]/20 hover:bg-[#1E2229]/5 text-xs font-bold transition-colors duration-150 shadow-2xs cursor-pointer">
            <HugeiconsIcon icon={Add01Icon} className="w-4 h-4" />
            <span>Tambah Event</span>
          </button>
        </div>
      </div>

      {/* 1. Overview Stat Cards Grid */}
      <ErrorBoundary
        label="Statistik Dashboard"
        onReset={() => refetchStats()}
      >
        <Suspense fallback={<StatCardsSkeleton />}>
          {statsPending ? (
            <StatCardsSkeleton />
          ) : statsError ? (
            <SectionErrorFallback label="statistik dashboard" onRetry={refetchStats} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((stat, i) => {
                const IconComponent = STAT_ICONS[stat.icon] ?? Compass01Icon
                return (
                  <div
                    key={i}
                    className="p-5 sm:p-6 bg-white/90 rounded-2xl sm:rounded-3xl border border-[#1E2229]/10 shadow-2xs flex flex-col justify-between space-y-4 hover:border-[#1E2229]/20 transition-colors duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-[#1E2229]/60">
                        {stat.title}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#1E2229]/5 text-[#1E2229] flex items-center justify-center border border-[#1E2229]/10">
                        <HugeiconsIcon icon={IconComponent} className="w-5 h-5" />
                      </div>
                    </div>

                    <div>
                      <div className="text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] font-extrabold leading-none tracking-tight text-[#1E2229]">
                        {stat.value}
                      </div>
                      <div className="mt-1">
                        <span
                          className={`inline-flex min-h-6 items-center rounded-full border px-2.5 py-1 text-[0.6875rem] font-bold leading-none ${stat.badgeColor}`}
                        >
                          {stat.subtext}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Suspense>
      </ErrorBoundary>

      {/* 2. Management Section Header Tabs */}
      <div className="bg-white/90 rounded-3xl border border-[#1E2229]/10 p-5 sm:p-6 shadow-2xs space-y-6">
        {/* Navigation Tabs bar */}
        <div className="flex min-w-0 flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2229]/10 pb-4">
          <div className="flex min-w-0 items-center gap-2 overflow-x-auto no-scrollbar pb-1" role="tablist" aria-label="Bagian pengelolaan admin">
            <button
              type="button"
              role="tab"
              id="tab-destinations"
              aria-selected={activeTab === "destinations"}
              aria-controls="panel-destinations"
              onClick={() => setActiveTab("destinations")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[0.8125rem] font-extrabold leading-none transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                activeTab === "destinations"
                  ? "bg-[#1E2229] text-white shadow-xs"
                  : "text-[#1E2229]/70 hover:bg-[#1E2229]/5 hover:text-[#1E2229]"
              }`}
            >
              <HugeiconsIcon icon={Compass01Icon} className="w-4 h-4" />
              <span>Kelola Destinasi &amp; Audio ({destinationsCount})</span>
            </button>

            <button
              type="button"
              role="tab"
              id="tab-events"
              aria-selected={activeTab === "events"}
              aria-controls="panel-events"
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[0.8125rem] font-extrabold leading-none transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                activeTab === "events"
                  ? "bg-[#1E2229] text-white shadow-xs"
                  : "text-[#1E2229]/70 hover:bg-[#1E2229]/5 hover:text-[#1E2229]"
              }`}
            >
              <HugeiconsIcon icon={Calendar03Icon} className="w-4 h-4" />
              <span>Kalender Acara Adat ({eventsCount})</span>
            </button>

            <button
              type="button"
              role="tab"
              id="tab-reviews"
              aria-selected={activeTab === "reviews"}
              aria-controls="panel-reviews"
              onClick={() => setActiveTab("reviews")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[0.8125rem] font-extrabold leading-none transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                activeTab === "reviews"
                  ? "bg-[#1E2229] text-white shadow-xs"
                  : "text-[#1E2229]/70 hover:bg-[#1E2229]/5 hover:text-[#1E2229]"
              }`}
            >
              <HugeiconsIcon icon={StarIcon} className="w-4 h-4" />
              <span>Moderasi Ulasan ({reviewsCount})</span>
            </button>
          </div>

          {/* Table Search Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <HugeiconsIcon
                icon={Search01Icon}
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#1E2229]/40"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Filter nama atau lokasi"
                placeholder="Filter nama atau lokasi..."
                className="w-full h-9 pl-9 pr-3 bg-vox-cream/60 border border-[#1E2229]/10 rounded-xl text-xs text-[#1E2229] placeholder:text-[#1E2229]/40 focus:outline-none focus:border-[#1E2229]"
              />
            </div>
            <button type="button" aria-label="Buka filter tabel" className="p-2 h-9 rounded-xl bg-vox-cream/60 border border-[#1E2229]/10 text-[#1E2229]/70 hover:text-[#1E2229] hover:bg-[#1E2229]/5 transition-colors cursor-pointer">
              <HugeiconsIcon icon={FilterIcon} className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab 1: Destinasi & Audio Management Table */}
        {activeTab === "destinations" && (
          <div id="panel-destinations" role="tabpanel" aria-labelledby="tab-destinations" className="space-y-4">
            <ErrorBoundary
              label="Tabel Destinasi"
              onReset={() => refetchDestinations()}
            >
              <Suspense fallback={<DestinationsTableSkeleton />}>
                {destPending ? (
                  <DestinationsTableSkeleton />
                ) : destError ? (
                  <SectionErrorFallback label="tabel destinasi" onRetry={refetchDestinations} />
                ) : (
                  <DestinationsPanel destinations={destinations ?? []} />
                )}
              </Suspense>
            </ErrorBoundary>
          </div>
        )}

        {/* Tab 2: Kalender Event Management Table */}
        {activeTab === "events" && (
          <div id="panel-events" role="tabpanel" aria-labelledby="tab-events" className="space-y-4">
            <ErrorBoundary
              label="Tabel Event"
              onReset={() => refetchEvents()}
            >
              <Suspense fallback={<EventsTableSkeleton />}>
                {eventsPending ? (
                  <EventsTableSkeleton />
                ) : eventsError ? (
                  <SectionErrorFallback label="tabel event" onRetry={refetchEvents} />
                ) : (
                  <EventsPanel events={events ?? []} />
                )}
              </Suspense>
            </ErrorBoundary>
          </div>
        )}

        {/* Tab 3: Moderasi Ulasan Queue */}
        {activeTab === "reviews" && (
          <div id="panel-reviews" role="tabpanel" aria-labelledby="tab-reviews" className="space-y-4">
            <ErrorBoundary
              label="Moderasi Ulasan"
              onReset={() => refetchReviews()}
            >
              <Suspense fallback={<ReviewsSkeleton />}>
                {reviewsPending ? (
                  <ReviewsSkeleton />
                ) : reviewsError ? (
                  <SectionErrorFallback label="moderasi ulasan" onRetry={refetchReviews} />
                ) : (
                  <ReviewsPanel reviews={reviews ?? []} />
                )}
              </Suspense>
            </ErrorBoundary>
          </div>
        )}
      </div>
    </div>
  )
}