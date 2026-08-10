"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  FavouriteIcon,
  Location01Icon,
  Clock01Icon,
  StarIcon,
  HeadphonesIcon,
} from "@hugeicons/core-free-icons"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@workspace/ui/components/carousel"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { apiRequest } from "@/features/auth/data/api-client"
import { useFavorites, useToggleFavorite } from "@/features/favorites/hooks/use-favorites"

export interface DestinationItem {
  id: string
  title: string
  location: string
  rating: number
  duration: string
  listeners: string
  image: string
  description: string
  isPopular?: boolean
}

interface PopularDestinationsProps {
  onSelectDestination?: (destination: DestinationItem) => void
  navigateOnClick?: boolean
}

export function PopularDestinations({
  onSelectDestination,
}: PopularDestinationsProps) {
  const router = useRouter()
  const [destinations, setDestinations] = useState<DestinationItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { isFavorite } = useFavorites()
  const toggleFavoriteMutation = useToggleFavorite()

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    apiRequest<DestinationItem[]>("/destinations")
      .then((data) => {
        if (isMounted) {
          const popularList = Array.isArray(data)
            ? data.filter((d) => d.isPopular || true)
            : []
          setDestinations(popularList)
        }
      })
      .catch(() => {
        if (isMounted) setDestinations([])
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [])

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavoriteMutation.mutate(id)
  }

  const handleCardClick = (dest: DestinationItem) => {
    onSelectDestination?.(dest)
    router.push(`/culture/${dest.id}`)
  }

  return (
    <section className="py-4 sm:py-5 bg-card">
      <div className="flex items-center justify-between px-4 sm:px-5 mb-3">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-foreground tracking-tight">
            Destinasi Populer
          </h2>
          <p className="text-xs text-muted-foreground">
            Audio guide terfavorit wisatawan minggu ini
          </p>
        </div>

        <button
          onClick={() => router.push("/explore")}
          className="text-xs font-extrabold text-primary hover:opacity-80 cursor-pointer"
        >
          Lihat Semua
        </button>
      </div>

      {/* Touch Swipe Carousel */}
      <div className="px-4 sm:px-5">
        {isLoading ? (
          <div className="flex gap-3 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-[80%] sm:w-[72%] shrink-0">
                <Skeleton className="w-full h-[260px] rounded-3xl" />
              </div>
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <div className="p-6 text-center text-xs font-bold text-muted-foreground bg-background rounded-2xl border border-border">
            Belum ada destinasi populer tersedia.
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3 sm:-ml-4">
              {destinations.map((dest) => {
                const isFav = isFavorite(dest.id)
                return (
                  <CarouselItem
                    key={dest.id}
                    className="pl-3 sm:pl-4 basis-[80%] sm:basis-[72%]"
                  >
                    <div
                      onClick={() => handleCardClick(dest)}
                      className="w-full bg-card rounded-3xl border border-border shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between h-full"
                    >
                      {/* Card Image Header */}
                      <div className="relative w-full h-[150px] sm:h-[160px] overflow-hidden">
                        <Image
                          src={dest.image}
                          alt={dest.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                          sizes="(max-width: 640px) 80vw, 300px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Bookmark Heart Button */}
                        <button
                          onClick={(e) => toggleFavorite(dest.id, e)}
                          aria-label="Simpan Favorit"
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer ${
                            isFav
                              ? "bg-destructive text-white"
                              : "bg-black/30 text-white hover:bg-black/50"
                          }`}
                        >
                          <HugeiconsIcon
                            icon={FavouriteIcon}
                            className={`w-4 h-4 ${isFav ? "fill-current" : ""}`}
                          />
                        </button>

                        {/* Duration Badge */}
                        <div className="absolute bottom-2.5 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                          <HugeiconsIcon icon={Clock01Icon} className="w-3 h-3" />
                          <span>{dest.duration}</span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-3.5 sm:p-4 flex flex-col justify-between gap-2.5 flex-1">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="text-sm font-extrabold text-foreground line-clamp-1">
                              {dest.title}
                            </h3>
                          </div>

                          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            <HugeiconsIcon icon={Location01Icon} className="w-3 h-3 text-destructive shrink-0" />
                            <span className="truncate">{dest.location}</span>
                          </div>
                        </div>

                        {/* Footer Stats */}
                        <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] font-semibold text-foreground">
                          <div className="flex items-center gap-1 text-amber-500">
                            <HugeiconsIcon icon={StarIcon} className="w-3.5 h-3.5 fill-current" />
                            <span>{dest.rating}</span>
                          </div>

                          <div className="flex items-center gap-1 text-muted-foreground">
                            <HugeiconsIcon icon={HeadphonesIcon} className="w-3.5 h-3.5" />
                            <span>{dest.listeners}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </section>
  )
}
