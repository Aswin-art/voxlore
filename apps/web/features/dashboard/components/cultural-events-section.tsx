"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import {
  Calendar01Icon,
  Location01Icon,
} from "@hugeicons/core-free-icons"

export interface CulturalEvent {
  id: string
  title: string
  location: string
  date: string
  monthBadge: string
  dayBadge: string
  image: string
}

export const CULTURAL_EVENTS_DATA: CulturalEvent[] = [
  {
    id: "rambu-solo",
    title: "Upacara Adat Rambu Solo'",
    location: "Tana Toraja, Sulawesi Selatan",
    date: "15 - 20 Agustus 2026",
    monthBadge: "AGU",
    dayBadge: "15",
    image: "/images/prambanan-hero.png",
  },
  {
    id: "secang-ritual",
    title: "Festival Grebeg Maulud",
    location: "Kraton Yogyakarta",
    date: "28 Agustus 2026",
    monthBadge: "AGU",
    dayBadge: "28",
    image: "/images/about-culture.png",
  },
]

interface CulturalEventsSectionProps {
  onSelectEvent?: (event: CulturalEvent) => void
}

export function CulturalEventsSection({ onSelectEvent }: CulturalEventsSectionProps) {
  return (
    <section className="py-4 sm:py-5 bg-card">
      <div className="flex items-center justify-between px-4 sm:px-5 mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <HugeiconsIcon icon={Calendar01Icon} className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-foreground tracking-tight">
              Kalender Ritual &amp; Festival Budaya
            </h2>
            <p className="text-xs text-muted-foreground">
              Jadwal ritual &amp; upacara adat terlengkap
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-4 sm:px-5">
        {CULTURAL_EVENTS_DATA.map((evt) => (
          <div
            key={evt.id}
            onClick={() => onSelectEvent?.(evt)}
            className="relative w-full bg-background hover:bg-background/80 rounded-3xl border border-border p-3.5 sm:p-4 flex items-center gap-3.5 shadow-2xs transition-all cursor-pointer"
          >
            {/* Date Badge Box */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary text-primary-foreground flex flex-col items-center justify-center shrink-0 border border-white/10 shadow-xs">
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-75">
                {evt.monthBadge}
              </span>
              <span className="text-lg sm:text-xl font-black leading-none">
                {evt.dayBadge}
              </span>
            </div>

            {/* Event Info */}
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[11px] font-semibold text-muted-foreground mb-0.5">
                {evt.date}
              </span>

              <h3 className="text-xs sm:text-sm font-extrabold text-foreground truncate">
                {evt.title}
              </h3>

              <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                <HugeiconsIcon icon={Location01Icon} className="w-3 h-3 text-destructive shrink-0" />
                <span className="truncate">{evt.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
