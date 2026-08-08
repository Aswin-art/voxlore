"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Location01Icon,
  Notification01Icon,
  CheckmarkBadge01Icon,
} from "@hugeicons/core-free-icons"

export interface FestivalEvent {
  id: string
  title: string
  category: string
  location: string
  province: string
  date: string
  monthBadge: string
  dayBadge: string
  image: string
  description: string
  isFeatured?: boolean
}

const EVENTS_CATALOG: FestivalEvent[] = [
  {
    id: "rambu-solo",
    title: "Upacara Adat Rambu Solo'",
    category: "Upacara Adat",
    location: "Tana Toraja",
    province: "Sulawesi Selatan",
    date: "15 - 20 Agustus 2026",
    monthBadge: "AGU",
    dayBadge: "15",
    image: "/images/prambanan-hero.png",
    description: "Ritual pemakaman megah suku Toraja yang menyimbolkan penghormatan terakhir bagi leluhur dengan tarian kerbau dan musik bambu sakral.",
    isFeatured: true,
  },
  {
    id: "grebeg-maulud",
    title: "Festival Grebeg Maulud",
    category: "Ritual Keagamaan",
    location: "Kraton Yogyakarta",
    province: "D.I. Yogyakarta",
    date: "28 Agustus 2026",
    monthBadge: "AGU",
    dayBadge: "28",
    image: "/images/about-culture.png",
    description: "Pesta budaya memperingati kelahiran Nabi Muhammad SAW ditandai dengan iring-iringan gunungan hasil bumi dari istana Kraton.",
    isFeatured: true,
  },
  {
    id: "dieng-culture",
    title: "Dieng Culture Festival 2026",
    category: "Pentas Seni",
    location: "Dataran Tinggi Dieng",
    province: "Jawa Tengah",
    date: "05 - 07 September 2026",
    monthBadge: "SEP",
    dayBadge: "05",
    image: "/images/balinese-dance.png",
    description: "Puncak pemotongan rambut gimbal anak-anak Dieng yang diramaikan dengan pelepasan ribuan lampion dan pertunjukan musik Jazz di atas awan.",
    isFeatured: false,
  },
  {
    id: "sekaten-surakarta",
    title: "Upacara Sakral Perayaan Sekaten",
    category: "Ritual Tahunan",
    location: "Kraton Surakarta Hadiningrat",
    province: "Jawa Tengah",
    date: "12 September 2026",
    monthBadge: "SEP",
    dayBadge: "12",
    image: "/images/prambanan-hero.png",
    description: "Tradisi tabuhan Gamelan Kyai Guntur Madu yang bergema selama sepekan penuh menyambut perayaan sejarah Nusantara.",
    isFeatured: false,
  },
]

export default function EventsPage() {
  const [toast, setToast] = useState<string | null>(null)
  const [reminders, setReminders] = useState<Record<string, boolean>>({})

  const handleReminderToggle = (id: string, title: string) => {
    const isSet = !reminders[id]
    setReminders((prev) => ({ ...prev, [id]: isSet }))
    setToast(
      isSet
        ? `Pengingat diaktifkan untuk ${title} 🔔`
        : `Pengingat dibatalkan`
    )
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="p-4 sm:p-5 flex flex-col gap-4 pb-24 relative">
      {/* Toast Banner */}
      {toast && (
        <div className="fixed top-4 left-4 right-4 max-w-sm mx-auto z-50 p-3 bg-primary text-primary-foreground text-xs font-bold rounded-2xl flex items-center justify-between shadow-2xl animate-in fade-in slide-in-from-top-2">
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="opacity-70 hover:opacity-100 ml-2">
            ✕
          </button>
        </div>
      )}

      {/* Header Title (Identik dengan tata letak explore/page.tsx) */}
      <div>
        <h1 className="text-xl font-extrabold text-foreground tracking-tight">
          Festival Budaya
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Jadwal ritual sakral &amp; perayaan adat Nusantara
        </p>
      </div>

      {/* Events List */}
      <div className="flex flex-col gap-3">
        {EVENTS_CATALOG.map((evt) => {
          const isReminded = !!reminders[evt.id]
          return (
            <div
              key={evt.id}
              className="p-4 rounded-3xl bg-card border border-border flex flex-col gap-3 shadow-2xs hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Date Badge */}
                  <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex flex-col items-center justify-center shrink-0 shadow-xs border border-primary/30">
                    <span className="text-[9px] font-extrabold uppercase opacity-80 tracking-widest">
                      {evt.monthBadge}
                    </span>
                    <span className="text-lg font-black leading-none">{evt.dayBadge}</span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-extrabold text-amber-500 uppercase tracking-wider">
                      {evt.category}
                    </span>
                    <h2 className="text-sm font-extrabold text-foreground truncate">
                      {evt.title}
                    </h2>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                      <HugeiconsIcon icon={Location01Icon} className="w-3 h-3 text-destructive shrink-0" />
                      <span className="truncate">
                        {evt.location}, {evt.province}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reminder Bell Action */}
                <button
                  onClick={() => handleReminderToggle(evt.id, evt.title)}
                  className={`w-9 h-9 rounded-2xl border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    isReminded
                      ? "bg-amber-500/10 border-amber-500 text-amber-500"
                      : "bg-background border-border text-muted-foreground hover:text-foreground"
                  }`}
                  title="Ingatkan Saya"
                >
                  <HugeiconsIcon
                    icon={isReminded ? CheckmarkBadge01Icon : Notification01Icon}
                    className="w-4.5 h-4.5"
                  />
                </button>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 pl-0.5">
                {evt.description}
              </p>

              <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px]">
                <span className="font-bold text-foreground">{evt.date}</span>
                <button
                  onClick={() => {
                    setToast(`Panduan audio festival ${evt.title} siap di lokasi`)
                    setTimeout(() => setToast(null), 3000)
                  }}
                  className="text-primary font-extrabold hover:underline cursor-pointer"
                >
                  Lihat Panduan Audio →
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
