"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  GridViewIcon,
  MapsLocation01Icon,
  Location01Icon,
  StarIcon,
  Clock01Icon,
  HeadphonesIcon,
  FavouriteIcon,
} from "@hugeicons/core-free-icons"
import { DestinationItem } from "@/features/dashboard/components/popular-destinations"

export interface ExtendedDestinationItem extends DestinationItem {
  coordinates: { x: number; y: number } // Percentage position on map
  audioSpotsCount: number
}

const EXPLORE_ITEMS: ExtendedDestinationItem[] = [
  {
    id: "prambanan",
    title: "Candi Prambanan",
    location: "Sleman, Yogyakarta",
    price: "Rp 25.000",
    rating: 4.9,
    duration: "45 min",
    listeners: "1.2k+",
    image: "/images/prambanan-hero.png",
    description:
      "Panduan audio sinematik menelusuri legenda Roro Jonggrang, kisah epik Ramayana di dinding candi, dan keagungan arsitektur Trimurti.",
    coordinates: { x: 55, y: 52 },
    audioSpotsCount: 4,
  },
  {
    id: "borobudur",
    title: "Candi Borobudur",
    location: "Magelang, Jawa Tengah",
    price: "Rp 25.000",
    rating: 5.0,
    duration: "60 min",
    listeners: "2.4k+",
    image: "/images/hero-background.png",
    description:
      "Menyusuri tingkatan spiritual Kamadhatu, Rupadhatu, hingga Arupadhatu dalam ukiran relief abad ke-9 dipandu narator lokal.",
    coordinates: { x: 42, y: 45 },
    audioSpotsCount: 6,
  },
  {
    id: "uluwatu",
    title: "Tari Kecak Uluwatu",
    location: "Badung, Bali",
    price: "Rp 35.000",
    rating: 4.8,
    duration: "30 min",
    listeners: "980+",
    image: "/images/bali-culture.png",
    description:
      "Harmoni suara dan narasi filosofis Tari Kecak di atas tebing samudera Uluwatu dengan musik etnik Bali yang jernih.",
    coordinates: { x: 78, y: 70 },
    audioSpotsCount: 3,
  },
  {
    id: "wayang",
    title: "Wayang Kulit Purwa",
    location: "Surakarta, Jawa Tengah",
    price: "Rp 20.000",
    rating: 4.9,
    duration: "40 min",
    listeners: "650+",
    image: "/images/about-culture.png",
    description:
      "Seni teater bayangan mistis yang kaya akan filosofi dan nilai kearifan lokal Nusantara.",
    coordinates: { x: 62, y: 48 },
    audioSpotsCount: 5,
  },
]

type ViewMode = "card" | "map"

export default function ExplorePage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<ViewMode>("card")
  const [activeMapPin, setActiveMapPin] = useState<ExtendedDestinationItem>(EXPLORE_ITEMS[0]!)
  const [favorites, setFavorites] = useState<Record<string, boolean>>({ prambanan: true })

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleOpenDetail = (item: DestinationItem) => {
    router.push(`/culture/${item.id}`)
  }

  return (
    <div className="p-4 sm:p-5 flex flex-col gap-4">
      {/* Header Title & View Mode Toggle Switcher */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-foreground tracking-tight">
            Jelajahi Budaya
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Temukan situs &amp; cerita audio Nusantara
          </p>
        </div>

        {/* View Mode Toggle Pill (Default: Card) */}
        <div className="flex items-center p-1 bg-background rounded-2xl border border-border shrink-0">
          <button
            onClick={() => setViewMode("card")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              viewMode === "card"
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <HugeiconsIcon icon={GridViewIcon} className="w-3.5 h-3.5" />
            <span>Card</span>
          </button>

          <button
            onClick={() => setViewMode("map")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              viewMode === "map"
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <HugeiconsIcon icon={MapsLocation01Icon} className="w-3.5 h-3.5" />
            <span>Map</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: HORIZONTAL CARD VIEW (Default) */}
      {viewMode === "card" && (
        <div className="flex flex-col gap-3">
          {EXPLORE_ITEMS.map((item) => {
            const isFav = !!favorites[item.id]
            return (
              <div
                key={item.id}
                onClick={() => handleOpenDetail(item)}
                className="w-full bg-card rounded-3xl border border-border p-3 flex items-center gap-3 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                {/* Horizontal Card Left: Square Image */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-border/50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover brightness-95"
                    sizes="112px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Rating Badge */}
                  <div className="absolute bottom-1.5 left-1.5 flex items-center gap-0.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <HugeiconsIcon icon={StarIcon} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                {/* Horizontal Card Right: Content Info */}
                <div className="flex flex-col justify-between flex-1 min-w-0 h-full py-0.5">
                  <div>
                    <div className="flex items-start justify-between gap-1 mb-0.5">
                      <h3 className="text-sm font-extrabold text-foreground tracking-tight truncate">
                        {item.title}
                      </h3>

                      {/* Bookmark Heart Button */}
                      <button
                        onClick={(e) => toggleFavorite(item.id, e)}
                        aria-label="Simpan Favorit"
                        className="text-muted-foreground hover:text-foreground shrink-0 cursor-pointer p-0.5"
                      >
                        <HugeiconsIcon
                          icon={FavouriteIcon}
                          className={`w-4 h-4 ${isFav ? "fill-destructive text-destructive" : ""}`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground mb-1">
                      <HugeiconsIcon icon={Location01Icon} className="w-3 h-3 text-destructive shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  </div>

                  {/* Metadata Chips: Audio Spots & Duration */}
                  <div className="flex items-center gap-2 text-[10px] font-extrabold text-muted-foreground">
                    <div className="flex items-center gap-1 bg-background border border-border px-2 py-0.5 rounded-lg text-foreground">
                      <HugeiconsIcon icon={HeadphonesIcon} className="w-3 h-3" />
                      <span>{item.audioSpotsCount} Spot</span>
                    </div>

                    <div className="flex items-center gap-1 bg-background border border-border px-2 py-0.5 rounded-lg">
                      <HugeiconsIcon icon={Clock01Icon} className="w-3 h-3" />
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  {/* Price Footer */}
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="text-xs font-black text-primary">
                      {item.price}
                    </span>

                    <span className="text-[11px] font-bold text-muted-foreground">
                      {item.listeners} pendengar
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* VIEW MODE 2: MAP VIEW */}
      {viewMode === "map" && (
        <div className="flex flex-col gap-4">
          {/* Simulated Interactive Map Frame */}
          <div className="relative w-full h-[380px] sm:h-[420px] rounded-3xl overflow-hidden border border-border bg-[#E5E0D5] flex items-center justify-center shadow-inner">
            {/* Map Grid Pattern background */}
            <div className="absolute inset-0 bg-[radial-gradient(#1E2229_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

            {/* Simulated Map Labels */}
            <span className="absolute top-4 left-4 text-[10px] font-extrabold tracking-widest uppercase text-muted-foreground/60">
              Peta Lokasi Situs Budaya (Jawa &amp; Bali)
            </span>

            {/* Interactive Map Pins */}
            {EXPLORE_ITEMS.map((pin) => {
              const isActive = activeMapPin.id === pin.id
              return (
                <button
                  key={pin.id}
                  onClick={() => setActiveMapPin(pin)}
                  style={{ left: `${pin.coordinates.x}%`, top: `${pin.coordinates.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all duration-300 z-10 ${
                    isActive ? "scale-110 z-20" : "hover:scale-105"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg border-2 border-card transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/30"
                        : "bg-card text-foreground hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    <HugeiconsIcon icon={Location01Icon} className="w-4 h-4 fill-current" />
                  </div>
                  <span
                    className={`mt-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground border border-border"
                    }`}
                  >
                    {pin.title}
                  </span>
                </button>
              )
            })}

            {/* Active Pin Floating Card Preview */}
            {activeMapPin && (
              <div className="absolute bottom-3 left-3 right-3 bg-card p-3 rounded-2xl border border-border shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-border">
                  <Image
                    src={activeMapPin.image}
                    alt={activeMapPin.title}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  <h4 className="text-xs font-extrabold text-foreground truncate">
                    {activeMapPin.title}
                  </h4>
                  <span className="text-[11px] text-muted-foreground truncate">
                    {activeMapPin.location}
                  </span>
                  <span className="text-xs font-extrabold text-primary mt-0.5">
                    {activeMapPin.price}
                  </span>
                </div>

                <button
                  onClick={() => handleOpenDetail(activeMapPin)}
                  className="px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-extrabold shrink-0 hover:bg-primary/90 transition-colors shadow-xs cursor-pointer"
                >
                  Detail
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
