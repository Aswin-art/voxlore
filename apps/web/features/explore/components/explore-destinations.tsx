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
import type { NormalizedDestination } from "@/lib/data"
import ErrorBoundary from "@/components/error-boundary"
import { useDestinations, useDestinationCategories } from "@/features/explore/hooks/use-destinations"
import { useFavorites, useToggleFavorite } from "@/features/favorites/hooks/use-favorites"
import { useProvinces } from "@/features/shared/hooks/use-provinces"
import { SearchableSelect } from "@/features/shared/components/searchable-select"
import { ToastBanner } from "@/features/shared/components/toast-banner"
import { DestinationItem } from "@/features/dashboard/components/popular-destinations"

export interface ExtendedDestinationItem extends DestinationItem {
  audioSpotsCount: number
  category?: string
  province?: string
}

/** Adaptasi NormalizedDestination menjadi shape kartu explore. */
function toExtendedItem(d: NormalizedDestination & { audioSpots?: Array<unknown> }): ExtendedDestinationItem {
  return {
    id: d.id,
    title: d.title,
    location: d.location,
    rating: d.rating,
    duration: d.duration,
    listeners: d.listeners,
    image: d.image,
    description: d.description,
    category: d.category,
    province: d.province,
    audioSpotsCount: d.audioSpots?.length ?? 4,
  }
}

const SKELETON_COUNT = 6

export function ExplorePageSkeleton() {
  return (
    <div className="flex flex-col pb-28 relative w-full min-w-0">
      <header className="sticky top-0 z-30 bg-card p-4 sm:p-5 border-b border-border/60 shadow-xs flex flex-col gap-3.5 w-full min-w-0">
        <div className="flex items-center justify-between gap-2 min-w-0">
          <div className="flex w-40 h-6 rounded-lg bg-background border border-border/70 animate-pulse" />
        </div>
        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 h-10 rounded-2xl bg-background border border-border/70 animate-pulse" />
          <div className="w-10 h-10 rounded-2xl bg-background border border-border/70 animate-pulse" />
        </div>
      </header>

      <div className="p-4 sm:p-5 flex flex-col gap-3 w-full min-w-0">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div
            key={i}
            className="w-full bg-card rounded-3xl border border-border p-3 flex items-center gap-3 shadow-2xs animate-pulse"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-border/60 shrink-0" />
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <div className="w-3/5 h-4 rounded-lg bg-border/70" />
              <div className="w-2/5 h-3 rounded-lg bg-border/60" />
              <div className="w-1/3 h-6 rounded-lg bg-border/60 mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ExploreErrorFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      role="alert"
      className="w-full rounded-3xl border border-border bg-card p-8 text-center flex flex-col items-center justify-center gap-3"
    >
      <HugeiconsIcon icon={Search01Icon} className="w-8 h-8 text-muted-foreground/40" />
      <span className="text-xs font-extrabold text-foreground">
        Gagal memuat destinasi budaya
      </span>
      <span className="text-[11px] text-muted-foreground">
        Terjadi kendala saat mengambil data. Silakan coba lagi.
      </span>
      <button
        onClick={onRetry}
        className="mt-1 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 cursor-pointer"
      >
        Coba Lagi
      </button>
    </div>
  )
}

export function ExploreContent() {
  const router = useRouter()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const { isFavorite } = useFavorites()
  const toggleFavoriteMutation = useToggleFavorite()

  const [searchQuery, setSearchQuery] = useQueryState("q", parseAsString.withDefault(""))
  const [selectedCategory, setSelectedCategory] = useQueryState("category", parseAsString.withDefault("Semua"))
  const [selectedProvince, setSelectedProvince] = useQueryState("province", parseAsString.withDefault("Semua"))

  const { destinations, isPending, isError, refetch } = useDestinations({
    search: searchQuery,
    category: selectedCategory,
    province: selectedProvince,
  })
  const categoriesQuery = useDestinationCategories()
  const provincesQuery = useProvinces()

  const provinces = provincesQuery.data

  const activeFilterCount =
    (selectedCategory !== "Semua" ? 1 : 0) + (selectedProvince !== "Semua" ? 1 : 0)

  const handleResetFilters = () => {
    setSelectedCategory(null)
    setSelectedProvince(null)
  }

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavoriteMutation.mutate(id, {
      onSuccess: (res) => {
        setToast(res.message)
        setTimeout(() => setToast(null), 3000)
      },
      onError: (err) => {
        setToast(err instanceof Error ? err.message : "Gagal mengubah status favorit")
        setTimeout(() => setToast(null), 3000)
      },
    })
  }

  const handleOpenDetail = (item: DestinationItem) => {
    router.push(`/culture/${item.id}`)
  }

  const categoriesOptions = categoriesQuery.isPending ? ["Semua"] : (categoriesQuery.data ?? ["Semua"])
  const provincesOptions = provinces ? ["Semua", ...provinces.map((p) => p.name)] : ["Semua"]

  const items: ExtendedDestinationItem[] = (destinations ?? []).map((d) =>
    toExtendedItem(d),
  )

  return (
    <div className="flex flex-col pb-28 relative w-full min-w-0">
      <ToastBanner message={toast} onDismiss={() => setToast(null)} />
      {/* Sticky Header Navigation & Search Bar */}
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
          <ErrorBoundary label="Panel Filter" onReset={() => refetch()}>
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
                  options={categoriesOptions}
                  value={selectedCategory}
                  onChange={(val) => setSelectedCategory(val)}
                  placeholder="Semua Kategori"
                  searchPlaceholder="Cari kategori situs..."
                />

                {/* Filter 2: Provinsi */}
                <SearchableSelect
                  label="Provinsi / Wilayah"
                  icon={Location01Icon}
                  options={provincesOptions}
                  value={selectedProvince}
                  onChange={(val) => setSelectedProvince(val)}
                  placeholder="Semua Provinsi"
                  searchPlaceholder="Cari provinsi..."
                />
              </div>
            </div>
          </ErrorBoundary>
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
          {isPending ? (
            Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div
                key={i}
                className="w-full bg-card rounded-3xl border border-border p-3 flex items-center gap-3 shadow-2xs animate-pulse"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-border/60 shrink-0" />
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <div className="w-3/5 h-4 rounded-lg bg-border/70" />
                  <div className="w-2/5 h-3 rounded-lg bg-border/60" />
                  <div className="w-1/3 h-6 rounded-lg bg-border/60 mt-2" />
                </div>
              </div>
            ))
          ) : isError ? (
            <ExploreErrorFallback onRetry={() => refetch()} />
          ) : items.length === 0 ? (
            <div className="p-8 text-center bg-card rounded-3xl border border-border flex flex-col items-center justify-center gap-2 my-2">
              <HugeiconsIcon icon={Search01Icon} className="w-8 h-8 text-muted-foreground/40" />
              <span className="text-xs font-extrabold text-foreground">Tidak ada situs budaya ditemukan</span>
              <span className="text-[11px] text-muted-foreground">Coba ubah kata kunci pencarian atau kategori filter Anda.</span>
            </div>
          ) : (
            items.map((item) => {
              const isFav = isFavorite(item.id)
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
