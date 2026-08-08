"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Location01Icon,
  StarIcon,
  Clock01Icon,
  HeadphonesIcon,
  FavouriteIcon,
} from "@hugeicons/core-free-icons"

export interface FavoriteItem {
  id: string
  title: string
  location: string
  price: string
  rating: number
  duration: string
  listeners: string
  image: string
  audioSpotsCount: number
}

const FAVORITE_ITEMS: FavoriteItem[] = [
  {
    id: "prambanan",
    title: "Candi Prambanan",
    location: "Sleman, Yogyakarta",
    price: "Rp 25.000",
    rating: 4.9,
    duration: "45 min",
    listeners: "1.2k+",
    image: "/images/prambanan-hero.png",
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
    audioSpotsCount: 3,
  },
]

export default function FavoritesPage() {
  const router = useRouter()
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    prambanan: true,
    borobudur: true,
    uluwatu: true,
  })

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleOpenDetail = (id: string) => {
    router.push(`/culture/${id}`)
  }

  const favoriteList = FAVORITE_ITEMS.filter((item) => favorites[item.id])

  return (
    <div className="p-4 sm:p-5 flex flex-col gap-4">
      {/* Header Title */}
      <div>
        <h1 className="text-xl font-extrabold text-foreground tracking-tight">
          Destinasi Favorit Saya
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Koleksi situs candi &amp; audio guide terfavorit yang kamu simpan
        </p>
      </div>

      {/* Favorites Card List */}
      {favoriteList.length === 0 ? (
        <div className="p-10 text-center bg-card rounded-3xl border border-border flex flex-col items-center justify-center gap-2">
          <HugeiconsIcon icon={FavouriteIcon} className="w-10 h-10 text-muted-foreground/30" />
          <span className="text-xs font-extrabold text-foreground">Belum ada destinasi favorit</span>
          <span className="text-[11px] text-muted-foreground">
            Jelajahi kebudayaan Nusantara dan simpan situs favoritmu di sini.
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {favoriteList.map((item) => {
            const isFav = !!favorites[item.id]
            return (
              <div
                key={item.id}
                onClick={() => handleOpenDetail(item.id)}
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

                      {/* Bookmark Heart Button (Active Red) */}
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
                      <HugeiconsIcon icon={HeadphonesIcon} className="w-3 h-3 text-primary" />
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
    </div>
  )
}
