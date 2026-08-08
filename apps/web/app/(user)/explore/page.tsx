"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useQueryState, parseAsString } from "nuqs"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Location01Icon,
  StarIcon,
  Clock01Icon,
  HeadphonesIcon,
  FavouriteIcon,
  Search01Icon,
  FilterIcon,
  Cancel01Icon,
  GridIcon,
} from "@hugeicons/core-free-icons"
import { DestinationItem } from "@/features/dashboard/components/popular-destinations"
import { SearchableSelect } from "@/features/shared/components/searchable-select"
import { CATEGORIES, PROVINCES } from "@/features/shared/data/filter-options"

export interface ExtendedDestinationItem extends DestinationItem {
  audioSpotsCount: number
  category?: string
  province?: string
}

const EXPLORE_ITEMS: ExtendedDestinationItem[] = [
  {
    id: "prambanan",
    title: "Candi Prambanan",
    location: "Sleman, Yogyakarta",
    province: "D.I. Yogyakarta",
    rating: 4.9,
    duration: "45 min",
    listeners: "1.2k+",
    image: "/images/prambanan-hero.png",
    description:
      "Panduan audio sinematik menelusuri legenda Roro Jonggrang, kisah epik Ramayana di dinding candi, dan keagungan arsitektur Trimurti.",
    audioSpotsCount: 4,
    category: "Candi & Situs",
  },
  {
    id: "borobudur",
    title: "Candi Borobudur",
    location: "Magelang, Jawa Tengah",
    province: "Jawa Tengah",
    rating: 5.0,
    duration: "60 min",
    listeners: "2.4k+",
    image: "/images/hero-background.png",
    description:
      "Menyusuri tingkatan spiritual Kamadhatu, Rupadhatu, hingga Arupadhatu dalam ukiran relief abad ke-9 dipandu narator lokal.",
    audioSpotsCount: 6,
    category: "Candi & Situs",
  },
  {
    id: "uluwatu",
    title: "Tari Kecak Uluwatu",
    location: "Badung, Bali",
    province: "Bali",
    rating: 4.8,
    duration: "30 min",
    listeners: "980+",
    image: "/images/bali-culture.png",
    description:
      "Harmoni suara dan narasi filosofis Tari Kecak di atas tebing samudera Uluwatu dengan musik etnik Bali yang jernih.",
    audioSpotsCount: 3,
    category: "Tari & Seni",
  },
  {
    id: "wayang",
    title: "Wayang Kulit Purwa",
    location: "Surakarta, Jawa Tengah",
    province: "Jawa Tengah",
    rating: 4.7,
    duration: "40 min",
    listeners: "750+",
    image: "/images/prambanan-hero.png",
    description:
      "Seni pertunjukan bayangan yang sarat makna kebaikan melawan kebatilan dalam lakon Mahabharata & Ramayana.",
    audioSpotsCount: 4,
    category: "Wayang",
  },
  {
    id: "penglipuran",
    title: "Desa Wisata Penglipuran",
    location: "Bangli, Bali",
    province: "Bali",
    rating: 4.9,
    duration: "50 min",
    listeners: "1.5k+",
    image: "/images/bali-culture.png",
    description:
      "Arsitektur tradisional Bali yang teratur, tata ruang Tri Mandala, dan pelestarian hutan bambu yang asri.",
    audioSpotsCount: 5,
    category: "Desa Wisata",
  },
]

export default function ExplorePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useQueryState("q", parseAsString.withDefault(""))
  const [selectedCategory, setSelectedCategory] = useQueryState("category", parseAsString.withDefault("Semua"))
  const [selectedProvince, setSelectedProvince] = useQueryState("province", parseAsString.withDefault("Semua"))
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    prambanan: true,
  })

  const activeFilterCount =
    (selectedCategory !== "Semua" ? 1 : 0) + (selectedProvince !== "Semua" ? 1 : 0)

  const handleResetFilters = () => {
    setSelectedCategory(null)
    setSelectedProvince(null)
  }

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleOpenDetail = (item: DestinationItem) => {
    router.push(`/culture/${item.id}`)
  }

  // Search, Category, & Province Filtering Logic
  const filteredItems = EXPLORE_ITEMS.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.province && item.province.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === "Semua" || item.category === selectedCategory

    const matchesProvince =
      selectedProvince === "Semua" || item.province === selectedProvince

    return matchesSearch && matchesCategory && matchesProvince
  })

  return (
    <div className="flex flex-col pb-28 relative w-full min-w-0">
      {/* Sticky Header Navigation & Search Bar */}
      <header className="sticky top-0 z-30 bg-card p-4 sm:p-5 border-b border-border/60 shadow-xs flex flex-col gap-3.5 w-full min-w-0">
        {/* Header Title */}
        <div className="flex items-center justify-between gap-2 min-w-0">
          <div className="flex flex-col min-w-0">
            <h1 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight truncate">
              Jelajahi Budaya
            </h1>
            <p className="text-xs text-muted-foreground truncate">
              Temukan situs &amp; cerita audio Nusantara
            </p>
          </div>
        </div>

        {/* Search Input Bar with Filter Button */}
        <div className="flex items-center gap-2 w-full">
          <div className="relative flex-1 flex items-center">
            <HugeiconsIcon
              icon={Search01Icon}
              className="absolute left-3.5 w-4 h-4 text-muted-foreground pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value || null)}
              placeholder="Cari situs candi, tari, atau cerita rakyat..."
              className="w-full pl-10 pr-8 py-2.5 text-xs sm:text-sm bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-card transition-all text-foreground placeholder:text-muted-foreground font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery(null)}
                className="absolute right-3 text-xs text-muted-foreground hover:text-foreground p-1 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

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
      </header>

      {/* Main Content Body */}
      <div className="p-4 sm:p-5 flex flex-col gap-4 w-full min-w-0">
        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="p-4 sm:p-5 rounded-3xl bg-card border border-border/80 shadow-xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={FilterIcon} className="w-4 h-4 text-primary" />
                <span className="text-xs font-black text-foreground tracking-tight">
                  Filter Budaya
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
                onChange={(val) => setSelectedCategory(val)}
                placeholder="Semua Kategori"
                searchPlaceholder="Cari kategori situs..."
              />

              {/* Filter 2: Provinsi */}
              <SearchableSelect
                label="Provinsi / Wilayah"
                icon={Location01Icon}
                options={PROVINCES}
                value={selectedProvince}
                onChange={(val) => setSelectedProvince(val)}
                placeholder="Semua Provinsi"
                searchPlaceholder="Cari provinsi..."
              />
            </div>
          </div>
        )}

        {/* Active Filter Summary Badges */}
        {activeFilterCount > 0 && !isFilterOpen && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar animate-in fade-in duration-200">
            <span className="text-[10px] font-bold text-muted-foreground uppercase shrink-0">Filter Aktif:</span>
            {selectedCategory !== "Semua" && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 text-xs font-extrabold px-2.5 py-1 rounded-full shrink-0 cursor-pointer hover:bg-primary/20 transition-colors"
              >
                <span>{selectedCategory}</span>
                <HugeiconsIcon icon={Cancel01Icon} className="w-3 h-3" />
              </button>
            )}
            {selectedProvince !== "Semua" && (
              <button
                onClick={() => setSelectedProvince(null)}
                className="inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 text-xs font-extrabold px-2.5 py-1 rounded-full shrink-0 cursor-pointer hover:bg-primary/20 transition-colors"
              >
                <span>{selectedProvince}</span>
                <HugeiconsIcon icon={Cancel01Icon} className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={handleResetFilters}
              className="text-[10px] font-bold text-muted-foreground hover:text-foreground underline shrink-0 cursor-pointer ml-1"
            >
              Hapus Semua
            </button>
          </div>
        )}

        {/* HORIZONTAL CARD VIEW */}
        <div className="flex flex-col gap-3">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center bg-card rounded-3xl border border-border flex flex-col items-center justify-center gap-2 my-2">
              <HugeiconsIcon icon={Search01Icon} className="w-8 h-8 text-muted-foreground/40" />
              <span className="text-xs font-extrabold text-foreground">Tidak ada situs budaya ditemukan</span>
              <span className="text-[11px] text-muted-foreground">Coba ubah kata kunci pencarian atau kategori filter Anda.</span>
            </div>
          ) : (
            filteredItems.map((item) => {
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
                        <HugeiconsIcon icon={HeadphonesIcon} className="w-3 h-3 text-primary" />
                        <span>{item.audioSpotsCount} Spot</span>
                      </div>

                      <div className="flex items-center gap-1 bg-background border border-border px-2 py-0.5 rounded-lg">
                        <HugeiconsIcon icon={Clock01Icon} className="w-3 h-3" />
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
            })
          )}
        </div>
      </div>
    </div>
  )
}
