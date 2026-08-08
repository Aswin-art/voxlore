"use client"

import { useState } from "react"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  FavouriteIcon,
  Location01Icon,
  Clock01Icon,
  StarIcon,
  HeadphonesIcon,
  PlayIcon,
  CheckmarkCircle01Icon,
  QrCode01Icon,
} from "@hugeicons/core-free-icons"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from "@workspace/ui/components/sheet"
import { DestinationItem } from "./popular-destinations"

interface DestinationDetailSheetProps {
  destination: DestinationItem | null
  isOpen: boolean
  onClose: () => void
  onUnlockPass: (destination: DestinationItem) => void
}

export function DestinationDetailSheet({
  destination,
  isOpen,
  onClose,
  onUnlockPass,
}: DestinationDetailSheetProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedSpotIndex, setSelectedSpotIndex] = useState<number | null>(null)

  if (!destination) return null

  const audioSpots = [
    { id: 1, title: "Spot 1: Gapura Utama & Pelataran", duration: "05:20", free: true },
    { id: 2, title: "Spot 2: Relief Ukiran Ramayana", duration: "08:15", free: true },
    { id: 3, title: "Spot 3: Candi Shiva & Trimurti", duration: "12:40", free: false },
    { id: 4, title: "Spot 4: Arca & Museum Barang Candi", duration: "09:10", free: false },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="fixed inset-0 z-50 !w-screen !max-w-none !h-screen bg-[#FDFBF7] text-[#1E2229] p-0 flex flex-col justify-between border-none outline-none shadow-none rounded-none overflow-y-auto"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>{destination.title} - Detail Panduan Audio Pass</SheetTitle>
          <SheetDescription>
            Detail lengkap panduan audio sinematik dwibahasa untuk {destination.title}.
          </SheetDescription>
        </SheetHeader>

        {/* Top Hero Image Header with Floating Controls */}
        <div className="relative w-full h-[280px] sm:h-[340px] shrink-0">
          <Image
            src={destination.image}
            alt={destination.title}
            fill
            className="object-cover brightness-95"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />

          {/* Floating Top Nav Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <button
              onClick={onClose}
              aria-label="Kembali"
              className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsFavorite(!isFavorite)}
              aria-label="Simpan Favorit"
              className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer border border-white/20 ${
                isFavorite ? "bg-red-500 text-white" : "bg-black/40 text-white hover:bg-black/60"
              }`}
            >
              <HugeiconsIcon
                icon={FavouriteIcon}
                className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Detail Content Container (Overlapping Header) */}
        <div className="relative -mt-6 bg-[#FDFBF7] rounded-t-3xl p-5 sm:p-7 flex-1 flex flex-col justify-between gap-6 shadow-xl">
          {/* Title Line */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-[#1E2229] leading-tight">
                {destination.title}
              </h1>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <HugeiconsIcon icon={Location01Icon} className="w-4 h-4 text-red-500 shrink-0" />
              <span>{destination.location}</span>
            </div>
          </div>

          {/* Quick Stats Chips (Matching Mockup: Duration, Distance, Rating) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 py-1">
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-border/40 text-center shadow-2xs">
              <div className="flex items-center gap-1 text-blue-600 mb-1">
                <HugeiconsIcon icon={Clock01Icon} className="w-4 h-4" />
                <span className="text-xs font-black">{destination.duration}</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-semibold uppercase">
                Durasi Total
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-border/40 text-center shadow-2xs">
              <div className="flex items-center gap-1 text-amber-500 mb-1">
                <HugeiconsIcon icon={StarIcon} className="w-4 h-4 fill-current" />
                <span className="text-xs font-black">{destination.rating}</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-semibold uppercase">
                {destination.listeners} Ulasan
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-border/40 text-center shadow-2xs">
              <div className="flex items-center gap-1 text-emerald-600 mb-1">
                <HugeiconsIcon icon={QrCode01Icon} className="w-4 h-4" />
                <span className="text-xs font-black">QR Instan</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-semibold uppercase">
                Tanpa App
              </span>
            </div>
          </div>

          {/* Description Section */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-extrabold text-[#1E2229] uppercase tracking-wider">
              Deskripsi Panduan
            </h3>
            <p className="text-xs sm:text-sm text-[#1E2229]/80 leading-relaxed font-normal">
              {destination.description}
              {isExpanded && (
                <span>
                  {" "}Setiap titik cerita disajikan dengan teknologi dwibahasa (Bahasa Indonesia &amp; English) serta diisi langsung oleh narator lokal terkurasi.
                </span>
              )}
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 text-left cursor-pointer w-fit"
            >
              {isExpanded ? "Tampilkan lebih sedikit" : "Baca selengkapnya..."}
            </button>
          </div>

          {/* Audio Spots List */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-[#1E2229] uppercase tracking-wider">
                Daftar Titik Audio (4 Spot)
              </h3>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                2 Spot Gratis
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {audioSpots.map((spot, idx) => (
                <div
                  key={spot.id}
                  onClick={() => setSelectedSpotIndex(idx)}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition-all cursor-pointer ${
                    selectedSpotIndex === idx
                      ? "bg-[#1E2229] text-white border-[#1E2229]"
                      : "bg-white text-[#1E2229] border-border/40 hover:bg-vox-cream"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        selectedSpotIndex === idx
                          ? "bg-white/20 text-white"
                          : "bg-vox-cream text-[#1E2229]"
                      }`}
                    >
                      <HugeiconsIcon icon={PlayIcon} className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-xs font-extrabold truncate">{spot.title}</span>
                      <span
                        className={`text-[10px] font-medium ${
                          selectedSpotIndex === idx ? "text-white/70" : "text-muted-foreground"
                        }`}
                      >
                        {spot.duration}
                      </span>
                    </div>
                  </div>

                  {spot.free ? (
                    <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-emerald-500 text-white rounded-full shrink-0">
                      GRATIS
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-blue-600 text-white rounded-full shrink-0">
                      PASS
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Value Guarantee */}
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-blue-50 border border-blue-100 text-blue-900 text-xs font-medium">
            <HugeiconsIcon icon={CheckmarkCircle01Icon} className="w-5 h-5 text-blue-600 shrink-0" />
            <span>Akses seumur hidup untuk seluruh 4 titik cerita audio di destinasi ini.</span>
          </div>
        </div>

        {/* Bottom Sticky Action CTA Bar (Matching Mockup's Booking Button) */}
        <div className="sticky bottom-0 left-0 right-0 p-4 sm:p-5 bg-white border-t border-border/40 shadow-xl z-20">
          <button
            onClick={() => onUnlockPass(destination)}
            className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <HugeiconsIcon icon={HeadphonesIcon} className="w-5 h-5" />
            <span>Dengarkan Audio Guide</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
