"use client"

import { useState } from "react"
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

// Overview Stat Cards Data
const STAT_CARDS_DATA = [
  {
    title: "Total Destinasi & Situs",
    value: "154 Situs",
    subtext: "+12 bulan ini",
    icon: Compass01Icon,
    badgeColor: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  },
  {
    title: "Event & Acara Adat Aktif",
    value: "8 Event",
    subtext: "4 minggu ini",
    icon: Calendar03Icon,
    badgeColor: "bg-amber-500/10 text-amber-800 border-amber-500/20",
  },
  {
    title: "Total Pengguna Terdaftar",
    value: "12,480",
    subtext: "Wisatawan & Komunitas",
    icon: UserGroupIcon,
    badgeColor: "bg-blue-500/10 text-blue-800 border-blue-500/20",
  },
  {
    title: "Panduan Audio Didengar",
    value: "45.8k Kali",
    subtext: "Durasi rata-rata 38 min",
    icon: HeadphonesIcon,
    badgeColor: "bg-amber-500/10 text-amber-800 border-amber-500/20",
  },
]

// Mock Destinations Data aligned with popular-destinations & explore-grid
const DESTINATIONS_MANAGEMENT_DATA = [
  {
    id: "prambanan",
    name: "Candi Prambanan",
    location: "Sleman, DI Yogyakarta",
    category: "Candi & Situs Bersejarah",
    audioCount: 12,
    passPrice: "Rp 25.000",
    status: "Aktif",
    listeners: "1.2k+",
    rating: 4.9,
    image: "/images/prambanan-hero.png",
  },
  {
    id: "borobudur",
    name: "Candi Borobudur",
    location: "Magelang, Jawa Tengah",
    category: "Candi & Situs Bersejarah",
    audioCount: 18,
    passPrice: "Rp 25.000",
    status: "Aktif",
    listeners: "2.4k+",
    rating: 5.0,
    image: "/images/hero-background.png",
  },
  {
    id: "uluwatu",
    name: "Tari Kecak Uluwatu",
    location: "Badung, Bali",
    category: "Pertunjukan & Seni Tari",
    audioCount: 6,
    passPrice: "Rp 35.000",
    status: "Aktif",
    listeners: "980+",
    rating: 4.8,
    image: "/images/bali-culture.png",
  },
  {
    id: "wayang",
    name: "Wayang Kulit Purwa",
    location: "Surakarta, Jawa Tengah",
    category: "Seni Pertunjukan Bayangan",
    audioCount: 8,
    passPrice: "Rp 20.000",
    status: "Draft Review",
    listeners: "650+",
    rating: 4.9,
    image: "/images/about-culture.png",
  },
  {
    id: "toraja",
    name: "Situs Rante Tana Toraja",
    location: "Tana Toraja, Sulawesi Selatan",
    category: "Desa Adat & Warisan",
    audioCount: 10,
    passPrice: "Rp 30.000",
    status: "Aktif",
    listeners: "420+",
    rating: 4.7,
    image: "/images/prambanan-hero.png",
  },
]

// Mock Events Data aligned with cultural-events-section
const CULTURAL_EVENTS_DATA = [
  {
    id: "1",
    title: "Upacara Yadnya Kasada Bromo",
    date: "14 - 16 Agustus 2026",
    location: "Kawasan Laut Pasir Bromo",
    organizer: "Dinas Kebudayaan Probolinggo",
    status: "Mendatang",
    attendees: "1,500+",
  },
  {
    id: "2",
    title: "Festival Sekaten Surakarta",
    date: "20 - 27 September 2026",
    location: "Alun-Alun Keraton Surakarta",
    organizer: "Keraton Kasunanan Surakarta",
    status: "Mendatang",
    attendees: "3,200+",
  },
  {
    id: "3",
    title: "Pekan Seni Budaya Bali 2026",
    date: "05 - 12 Oktober 2026",
    location: "Taman Budaya Art Center Denpasar",
    organizer: "Pemprov Bali",
    status: "Persiapan",
    attendees: "5,000+",
  },
]

// Mock Moderation Reviews Queue
const REVIEWS_QUEUE = [
  {
    id: "rev-1",
    user: "Budi Santoso",
    destination: "Candi Prambanan",
    rating: 5,
    comment:
      "Panduan audio legenda Roro Jonggrang sangat imersif! Efek suara musik etniknya bikin merinding.",
    time: "10 menit lalu",
    status: "Perlu Moderasi",
  },
  {
    id: "rev-2",
    user: "Siti Rahmawati",
    destination: "Tari Kecak Uluwatu",
    rating: 4,
    comment:
      "Narator dwibahasa sangat jelas, suara latar Ombak Uluwatu pas banget dengan dramatisasi pertunjukan.",
    time: "45 menit lalu",
    status: "Perlu Moderasi",
  },
]

export function AdminDashboardView() {
  const [activeTab, setActiveTab] = useState<"destinations" | "events" | "reviews">("destinations")
  const [searchQuery, setSearchQuery] = useState("")

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS_DATA.map((stat, i) => (
          <div
            key={i}
            className="p-5 sm:p-6 bg-white/90 rounded-2xl sm:rounded-3xl border border-[#1E2229]/10 shadow-2xs flex flex-col justify-between space-y-4 hover:border-[#1E2229]/20 transition-colors duration-150"
          >
            <div className="flex items-center justify-between">
              <span className="text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-[#1E2229]/60">
                {stat.title}
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#1E2229]/5 text-[#1E2229] flex items-center justify-center border border-[#1E2229]/10">
                <HugeiconsIcon icon={stat.icon} className="w-5 h-5" />
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
        ))}
      </div>

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
              <span>Kelola Destinasi &amp; Audio ({DESTINATIONS_MANAGEMENT_DATA.length})</span>
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
              <span>Kalender Acara Adat ({CULTURAL_EVENTS_DATA.length})</span>
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
              <span>Moderasi Ulasan ({REVIEWS_QUEUE.length})</span>
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
                  {DESTINATIONS_MANAGEMENT_DATA.map((dest) => (
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
          </div>
        )}

        {/* Tab 2: Kalender Event Management Table */}
        {activeTab === "events" && (
          <div id="panel-events" role="tabpanel" aria-labelledby="tab-events" className="space-y-4">
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
                  {CULTURAL_EVENTS_DATA.map((evt) => (
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
          </div>
        )}

        {/* Tab 3: Moderasi Ulasan Queue */}
        {activeTab === "reviews" && (
          <div id="panel-reviews" role="tabpanel" aria-labelledby="tab-reviews" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REVIEWS_QUEUE.map((rev) => (
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
          </div>
        )}
      </div>
    </div>
  )
}
