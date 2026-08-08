"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  Location01Icon,
  StarIcon,
  Clock01Icon,
  HeadphonesIcon,
  FavouriteIcon,
  Search01Icon,
  FilterIcon,
  GridIcon,
  MapsLocation01Icon,
} from "@hugeicons/core-free-icons"
import { SearchableSelect } from "@/features/shared/components/searchable-select"
import { ToastBanner } from "@/features/shared/components/toast-banner"
import { CATEGORIES, PROVINCES } from "@/features/shared/data/filter-options"

export interface FavoriteItem {
  id: string
  title: string
  category: string
  province: string
  location: string
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
    category: "Candi & Situs",
    province: "D.I. Yogyakarta",
    location: "Sleman, Yogyakarta",
    rating: 4.9,
    duration: "45 min",
    listeners: "1.2k+",
    image: "/images/prambanan-hero.png",
    audioSpotsCount: 4,
  },
  {
    id: "borobudur",
    title: "Candi Borobudur",
    category: "Candi & Situs",
    province: "Jawa Tengah",
    location: "Magelang, Jawa Tengah",
    rating: 5.0,
    duration: "60 min",
    listeners: "2.4k+",
    image: "/images/hero-background.png",
    audioSpotsCount: 6,
  },
  {
    id: "uluwatu",
    title: "Tari Kecak Uluwatu",
    category: "Tari & Seni",
    province: "Bali",
    location: "Badung, Bali",
    rating: 4.8,
    duration: "30 min",
    listeners: "980+",
    image: "/images/bali-culture.png",
    audioSpotsCount: 3,
  },
]

export default function FavoritesPage() {
  const router = useRouter()
  const [toast, setToast] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [selectedProvince, setSelectedProvince] = useState("Semua")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    prambanan: true,
    borobudur: true,
    uluwatu: true,
  })

  const activeFilterCount =
    (selectedCategory !== "Semua" ? 1 : 0) + (selectedProvince !== "Semua" ? 1 : 0)

  const handleResetFilters = () => {
    setSelectedCategory("Semua")
    setSelectedProvince("Semua")
  }

  const toggleFavorite = (item: FavoriteItem, e: React.MouseEvent) => {
    e.stopPropagation()
    const isCurrentlyFav = !!favorites[item.id]
    setFavorites((prev) => ({ ...prev, [item.id]: !isCurrentlyFav }))

    setToast(
      !isCurrentlyFav
        ? `"${item.title}" ditambahkan ke favorit ❤️`
        : `"${item.title}" dihapus dari favorit`
    )
    setTimeout(() => setToast(null), 3000)
  }

  const handleOpenDetail = (id: string) => {
    router.push(`/culture/${id}`)
  }

  const favoriteList = FAVORITE_ITEMS.filter((item) => {
    const isFav = favorites[item.id]
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "Semua" || item.category === selectedCategory
    const matchesProvince =
      selectedProvince === "Semua" || item.province === selectedProvince

    return isFav && matchesSearch && matchesCategory && matchesProvince
  }).sort((a, b) => b.rating - a.rating)

  return (
    <div className="flex flex-col pb-28 relative w-full min-w-0">
      {/* Toast Notification Banner */}
      <ToastBanner message={toast} onDismiss={() => setToast(null)} />

      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-30 bg-card p-4 sm:p-5 border-b border-border/60 shadow-xs flex items-center gap-3 w-full min-w-0">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-2xl border border-border bg-background flex items-center justify-center text-foreground hover:bg-card transition-colors cursor-pointer shrink-0"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
        </button>
        <div className="flex flex-col min-w-0">
          <h1 className="text-lg font-extrabold text-foreground tracking-tight truncate">
            Favorit Saya
          </h1>
          <span className="text-xs text-muted-foreground truncate">
            Koleksi situs candi &amp; audio guide terfavorit yang kamu simpan
          </span>
        </div>
      </header>

      {/* Main Content Body */}
      <div className="p-4 sm:p-5 flex flex-col gap-4 w-full">

      {/* Search Input Bar with Filter Button (Matched with Explore) */}
      <div className="flex items-center gap-2 w-full">
        <div className="relative flex-1 flex items-center">
          <HugeiconsIcon
            icon={Search01Icon}
            className="absolute left-3.5 w-4 h-4 text-muted-foreground pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari situs candi, tari, atau cerita rakyat..."
            className="w-full pl-10 pr-8 py-2.5 text-xs sm:text-sm bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-card transition-all text-foreground placeholder:text-muted-foreground font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 text-xs text-muted-foreground hover:text-foreground p-1 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Toggle Button with Badge Counter */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          aria-label="Filter Pencarian"
          className={`relative w-10 h-10 rounded-2xl transition-all duration-200 flex items-center justify-center border shrink-0 cursor-pointer ${
            activeFilterCount > 0 || isFilterOpen
              ? "bg-primary text-primary-foreground border-primary shadow-xs"
              : "bg-background text-foreground hover:bg-primary hover:text-primary-foreground border-border"
          }`}
        >
          <HugeiconsIcon icon={FilterIcon} className="w-4 h-4" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs border-2 border-background">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Elegant Filter Panel (Searchable Select Dropdowns - Matched with Explore) */}
      {isFilterOpen && (
        <div className="p-4 sm:p-5 rounded-3xl bg-card border border-border/80 shadow-xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={FilterIcon} className="w-4 h-4 text-primary" />
              <span className="text-xs font-black text-foreground tracking-tight">
                Filter Favorit Budaya
              </span>
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {/* Filter 1: Kategori */}
            <SearchableSelect
              label="Kategori Situs"
              icon={GridIcon}
              options={CATEGORIES}
              value={selectedCategory}
              onChange={(val) => setSelectedCategory(val || "Semua")}
              placeholder="Semua Kategori"
              searchPlaceholder="Cari kategori situs..."
            />

            {/* Filter 2: Provinsi */}
            <SearchableSelect
              label="Provinsi / Wilayah"
              icon={MapsLocation01Icon}
              options={PROVINCES}
              value={selectedProvince}
              onChange={(val) => setSelectedProvince(val || "Semua")}
              placeholder="Semua Provinsi"
              searchPlaceholder="Cari provinsi..."
            />
          </div>
        </div>
      )}

      {/* Favorites Card List */}
      {favoriteList.length === 0 ? (
        <div className="p-10 text-center bg-card rounded-3xl border border-border flex flex-col items-center justify-center gap-2 mt-2">
          <HugeiconsIcon icon={Search01Icon} className="w-9 h-9 text-muted-foreground/30" />
          <span className="text-xs font-extrabold text-foreground">Tidak ada destinasi ditemukan</span>
          <span className="text-[11px] text-muted-foreground max-w-xs">
            {searchQuery || activeFilterCount > 0
              ? "Tidak ada favorit yang cocok dengan kata kunci atau filter yang dipilih."
              : "Jelajahi kebudayaan Nusantara dan simpan situs favoritmu di sini."}
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
                        onClick={(e) => toggleFavorite(item, e)}
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
                      <HugeiconsIcon icon={Clock01Icon} className="w-3 h-3 text-muted-foreground" />
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-1.5 flex items-center justify-between">
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
    </div>
  )
}
