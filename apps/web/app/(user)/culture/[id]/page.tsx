"use client"

import { Suspense, useState, use } from "react"
import { useMutation } from "@tanstack/react-query"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  FavouriteIcon,
  Share01Icon,
  Location01Icon,
  StarIcon,
  Clock01Icon,
  PlayIcon,
  PauseIcon,
  VolumeHighIcon,
  CheckmarkBadge01Icon,
  PencilEdit01Icon,
  Download01Icon,
  Tick01Icon,
  Search01Icon,
  Ticket01Icon,
} from "@hugeicons/core-free-icons"
import { WriteReviewDrawer } from "@/features/culture/components/write-review-drawer"
import { ActiveAudioBar } from "@/features/dashboard/components/active-audio-bar"
import { ToastBanner } from "@/features/shared/components/toast-banner"
import { createReview } from "@/features/culture/data/reviews-api"
import { useDestinationDetail } from "@/features/culture/hooks/use-destination-detail"
import { useAudioPlayback } from "@/features/culture/hooks/use-audio-playback"
import ErrorBoundary from "@/components/error-boundary"

export default function CultureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)

  return (
    <Suspense fallback={<CultureDetailSkeleton />}>
      <ErrorBoundary label="Detail Budaya">
        <CultureDetailContent id={resolvedParams.id} />
      </ErrorBoundary>
    </Suspense>
  )
}

/** Skeleton loading untuk halaman detail budaya. */
export function CultureDetailSkeleton() {
  return (
    <div className="flex flex-col min-h-screen bg-card text-foreground pb-12 relative">
      {/* Hero Skeleton */}
      <div className="relative w-full h-[260px] sm:h-[300px] bg-muted animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
          <div className="w-10 h-10 rounded-full bg-black/40 border border-white/20" />
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-black/40 border border-white/20" />
            <div className="w-10 h-10 rounded-full bg-black/40 border border-white/20" />
          </div>
        </div>
        <div className="absolute bottom-4 inset-x-4 flex flex-col gap-2 z-10">
          <div className="flex items-center gap-2">
            <div className="w-24 h-5 rounded-full bg-black/40 border border-white/20" />
            <div className="w-20 h-5 rounded-full bg-black/40 border border-white/20" />
          </div>
          <div className="w-2/3 h-6 rounded-lg bg-black/40" />
          <div className="w-1/2 h-4 rounded-lg bg-black/40" />
        </div>
      </div>

      {/* Body Skeleton */}
      <div className="p-4 sm:p-5 flex flex-col gap-5">
        {/* Rating & Stats Bar */}
        <div className="p-3.5 rounded-2xl bg-background border border-muted flex items-center justify-between">
          <div className="w-32 h-4 rounded-lg bg-muted animate-pulse" />
          <div className="w-24 h-4 rounded-lg bg-muted animate-pulse" />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <div className="w-40 h-4 rounded-lg bg-muted animate-pulse" />
          <div className="w-full h-3 rounded-lg bg-muted animate-pulse" />
          <div className="w-full h-3 rounded-lg bg-muted animate-pulse" />
          <div className="w-3/4 h-3 rounded-lg bg-muted animate-pulse" />
        </div>

        {/* Audio Spot List */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="w-44 h-4 rounded-lg bg-muted animate-pulse" />
            <div className="w-20 h-3 rounded-lg bg-muted animate-pulse" />
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl border border-muted flex items-center justify-between gap-3 animate-pulse"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-muted" />
                <div className="flex flex-col gap-1.5 min-w-0">
                  <div className="w-40 h-3 rounded-lg bg-muted" />
                  <div className="w-56 h-2.5 rounded-lg bg-muted" />
                </div>
              </div>
              <div className="w-16 h-3 rounded-lg bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Fallback error untuk halaman detail budaya dengan tombol retry. */
function CultureDetailErrorFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col min-h-screen bg-card text-foreground items-center justify-center px-6">
      <div className="w-full rounded-3xl border border-border bg-background p-8 text-center flex flex-col items-center justify-center gap-3">
        <HugeiconsIcon icon={Search01Icon} className="w-8 h-8 text-muted-foreground/40" />
        <span className="text-xs font-extrabold text-foreground">
          Gagal memuat detail budaya
        </span>
        <span className="text-[11px] text-muted-foreground">
          Terjadi kendala saat mengambil data destinasi. Silakan coba lagi.
        </span>
        <button
          onClick={onRetry}
          className="mt-1 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 cursor-pointer"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  )
}

/** State not-found ketika id destinasi tidak dikenal. */
function CultureDetailNotFound() {
  const router = useRouter()
  return (
    <div className="flex flex-col min-h-screen bg-card text-foreground items-center justify-center px-6">
      <div className="w-full rounded-3xl border border-border bg-background p-8 text-center flex flex-col items-center justify-center gap-3">
        <HugeiconsIcon icon={Search01Icon} className="w-8 h-8 text-muted-foreground/40" />
        <span className="text-xs font-extrabold text-foreground">
          Destinasi tidak ditemukan
        </span>
        <span className="text-[11px] text-muted-foreground">
          Data destinasi yang Anda cari tidak tersedia.
        </span>
        <button
          onClick={() => router.back()}
          className="mt-1 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 cursor-pointer"
        >
          Kembali
        </button>
      </div>
    </div>
  )
}

function CultureDetailContent({ id }: { id: string }) {
  const router = useRouter()
  const { data: detail, isPending, isError, error, refetch } = useDestinationDetail(id)

  const [isFav, setIsFav] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const {
    activeSpotId,
    isPlayingSpot,
    setIsPlayingSpot,
    downloadedSpots,
    downloadProgress,
    handleTogglePlaySpot,
    handleDownloadSpot,
    dismissAudio,
  } = useAudioPlayback()

  const [isReviewDrawerOpen, setIsReviewDrawerOpen] = useState(false)
  const reviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => void refetch(),
  })

  if (isPending) {
    return <CultureDetailSkeleton />
  }

  if (isError || !detail) {
    const isNotFound = error?.message === "Tidak ditemukan"
    if (isNotFound && !isPending) {
      return <CultureDetailNotFound />
    }
    return <CultureDetailErrorFallback onRetry={() => refetch()} />
  }


  const handleAddReview = async (review: { rating: number; comment: string; tags: string[] }) => {
    try {
      await reviewMutation.mutateAsync({
        destinationId: id,
        rating: review.rating,
        comment: review.comment,
        tags: review.tags,
      })
      setToast("Ulasan Anda berhasil dikirim untuk moderasi")
    } catch (error) {
      setToast(error instanceof Error ? error.message : "Ulasan gagal dikirim")
    }
  }

  const displayedReviews = detail.reviews.slice(0, 5)

  return (
    <div className="flex flex-col min-h-screen bg-card text-foreground pb-12 relative">
      {/* Toast Notification Banner */}
      <ToastBanner message={toast} onDismiss={() => setToast(null)} />

      {/* Hero Banner Header */}
      <div className="relative w-full h-[260px] sm:h-[300px]">
        <Image
          src={detail.image}
          alt={detail.title}
          fill
          className="object-cover brightness-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

        {/* Top Header Navigation Overlay */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
          <button
            onClick={() => router.back()}
            aria-label="Kembali"
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer border border-white/20"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFav(!isFav)}
              aria-label="Simpan Favorit"
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer border border-white/20"
            >
              <HugeiconsIcon
                icon={FavouriteIcon}
                className={`w-5 h-5 ${isFav ? "fill-destructive text-destructive" : ""}`}
              />
            </button>

            <button
              aria-label="Bagikan"
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer border border-white/20"
            >
              <HugeiconsIcon icon={Share01Icon} className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-4 inset-x-4 flex flex-col gap-1 text-white z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-extrabold backdrop-blur-xs">
              {detail.subtitle}
            </span>
            <div className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-full text-[10px] font-bold">
              <HugeiconsIcon icon={Clock01Icon} className="w-3 h-3 text-amber-400" />
              <span>{detail.duration}</span>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-md">
            {detail.title}
          </h1>

          <div className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
            <HugeiconsIcon icon={Location01Icon} className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span>{detail.location}</span>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-4 sm:p-5 flex flex-col gap-5">
        {/* Rating & Stats Bar */}
        <div className="p-3.5 rounded-2xl bg-background border border-border flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-1.5 text-amber-500">
            <HugeiconsIcon icon={StarIcon} className="w-4 h-4 fill-current" />
            <span className="text-foreground text-sm font-extrabold">{detail.rating}</span>
            <span className="text-muted-foreground font-normal">({detail.reviewsCount} ulasan)</span>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground">
            <HugeiconsIcon icon={VolumeHighIcon} className="w-4 h-4 text-primary" />
            <span className="text-foreground">{detail.audioSpots.length} Spot Audio</span>
          </div>
        </div>

        {/* Overview Description */}
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-extrabold text-foreground tracking-tight">
            Tentang Situs Ini
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {detail.description}
          </p>
        </div>

        {/* Package Expired Gateway Notice Banner */}
        <div
          onClick={() => router.push("/gateway/expired")}
          className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-between gap-3 cursor-pointer hover:bg-destructive/15 transition-colors shadow-2xs"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-destructive/20 text-destructive flex items-center justify-center shrink-0">
              <HugeiconsIcon icon={Ticket01Icon} className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-black text-foreground truncate">
                Masa Aktif Paket Berakhir
              </span>
              <span className="text-[11px] text-muted-foreground truncate">
                Klik untuk perbarui paket &amp; buka akses audio tanpa batas
              </span>
            </div>
          </div>
          <span className="text-xs font-black text-destructive shrink-0">
            Perbarui →
          </span>
        </div>

        {/* Audio Spot Location Guide List */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-foreground tracking-tight">
              Daftar Titik Audio Spot
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground">
                {detail.audioSpots.length} Titik Lokasi
              </span>
              <button
                type="button"
                onClick={() => {
                  let count = 0
                  detail.audioSpots.forEach((spot) => {
                    if (!downloadedSpots[spot.id] && downloadProgress[spot.id] === undefined) {
                      handleDownloadSpot({ stopPropagation: () => {} } as any, spot, {
                        title: detail.title,
                        siteName: detail.title,
                        siteId: detail.id,
                        image: detail.image,
                      })
                      count++
                    }
                  })
                  if (count > 0) {
                    setToast(`Mengunduh ${count} audio spot untuk akses luring! 📥`)
                  } else {
                    setToast("Semua audio spot sudah tersimpan luring 📁")
                  }
                  setTimeout(() => setToast(null), 3000)
                }}
                className="px-2.5 py-1 rounded-xl text-[11px] font-extrabold bg-secondary border border-border hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                Unduh Semua
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {detail.audioSpots.map((spot) => {
              const isPlayingThis = activeSpotId === spot.id && isPlayingSpot
              const isDownloaded = !!downloadedSpots[spot.id]
              const isDownloading = downloadProgress[spot.id] !== undefined
              const currentProgress = downloadProgress[spot.id] || 0

              return (
                <div
                  key={spot.id}
                  onClick={() => handleTogglePlaySpot(spot, { title: detail.title, location: detail.location, image: detail.image })}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isPlayingThis
                      ? "bg-primary text-primary-foreground border-primary shadow-md"
                      : "bg-background text-foreground border-border hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                        isPlayingThis
                          ? "bg-card text-foreground"
                          : "bg-card text-foreground border border-border shadow-2xs"
                      }`}
                    >
                      {spot.spotNumber}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <h3 className="text-xs sm:text-sm font-extrabold truncate">
                        {spot.title}
                      </h3>
                      <span
                        className={`text-[11px] truncate ${
                          isPlayingThis ? "text-primary-foreground/80" : "text-muted-foreground"
                        }`}
                      >
                        {spot.description}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[11px] font-bold ${
                        isPlayingThis ? "text-primary-foreground/90" : "text-muted-foreground"
                      }`}
                    >
                      {spot.duration}
                    </span>

                    {/* Download Audio Button Icon / Circular Progress */}
                    {isDownloading ? (
                      <div
                        className="relative w-8 h-8 flex items-center justify-center shrink-0 cursor-wait"
                        title={`Mengunduh ${currentProgress}%`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-8 h-8 -rotate-90 transform" viewBox="0 0 36 36">
                          <path
                            className={isPlayingThis ? "text-primary-foreground/30" : "text-muted-foreground/30"}
                            strokeWidth="3"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className={`transition-all duration-200 ease-out ${
                              isPlayingThis ? "text-primary-foreground" : "text-primary"
                            }`}
                            strokeDasharray="100, 100"
                            strokeDashoffset={100 - currentProgress}
                            strokeWidth="3"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span
                          className={`absolute text-[8px] font-black ${
                            isPlayingThis ? "text-primary-foreground" : "text-primary"
                          }`}
                        >
                          {currentProgress}%
                        </span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDownloadSpot(e, spot, {
                            title: detail.title,
                            siteName: detail.title,
                            siteId: detail.id,
                            image: detail.image,
                          })
                          if (isDownloaded) {
                            setToast(`Audio "${spot.title}" dihapus dari unduhan 🗑️`)
                          } else {
                            setToast(`Mengunduh audio: "${spot.title}"... 📥`)
                          }
                          setTimeout(() => setToast(null), 3000)
                        }}
                        aria-label="Unduh Audio Spot"
                        className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                          isPlayingThis
                            ? isDownloaded
                              ? "bg-emerald-500 text-white"
                              : "bg-card/20 text-primary-foreground hover:bg-card/40"
                            : isDownloaded
                              ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30"
                              : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                        title={isDownloaded ? "Telah Diunduh (Akses Offline)" : "Unduh Audio Offline"}
                      >
                        <HugeiconsIcon
                          icon={isDownloaded ? Tick01Icon : Download01Icon}
                          className="w-3.5 h-3.5"
                        />
                      </button>
                    )}

                    {/* Play Audio Button Icon */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleTogglePlaySpot(spot, { title: detail.title, location: detail.location, image: detail.image })
                      }}
                      aria-label="Putar Audio Spot"
                      className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform ${
                        isPlayingThis
                          ? "bg-card text-foreground"
                          : "bg-primary text-primary-foreground hover:scale-105"
                      }`}
                    >
                      <HugeiconsIcon
                        icon={isPlayingThis ? PauseIcon : PlayIcon}
                        className="w-3.5 h-3.5 fill-current ml-0.5"
                      />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* REDESIGNED REVIEW SECTION */}
        <div className="flex flex-col gap-4 pt-2">
          {/* Header Review Section + "Lihat Semua" Link */}
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-foreground tracking-tight">
              Ulasan Wisatawan
            </h2>

            <button
              onClick={() => router.push(`/culture/${detail.id}/reviews`)}
              className="text-xs font-extrabold text-primary hover:opacity-80 transition-opacity cursor-pointer"
            >
              Lihat Semua
            </button>
          </div>

          {/* Star Rating Distribution Breakdown Card */}
          <div className="p-4 rounded-3xl bg-background border border-border flex items-center gap-4 shadow-2xs">
            {/* Left: Overall Big Score */}
            <div className="flex flex-col items-center justify-center pr-4 border-r border-border shrink-0">
              <span className="text-3xl font-black text-foreground leading-none">
                {detail.rating}
              </span>
              <div className="flex items-center gap-0.5 text-amber-500 my-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <HugeiconsIcon
                    key={i}
                    icon={StarIcon}
                    className="w-3.5 h-3.5 fill-current"
                  />
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground font-bold">
                {detail.reviewsCount} Ulasan
              </span>
            </div>

            {/* Right: Star Rating Bars (5 to 1 Stars) */}
            <div className="flex-1 flex flex-col gap-1.5">
              {([5, 4, 3, 2, 1] as const).map((star) => {
                const percent = detail.ratingBreakdown[star]
                return (
                  <div key={star} className="flex items-center gap-2 text-[11px] font-bold">
                    <span className="w-3 text-muted-foreground text-right">{star}</span>
                    <HugeiconsIcon icon={StarIcon} className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                    <div className="flex-1 h-2 bg-card rounded-full overflow-hidden border border-border/50">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-7 text-[10px] text-muted-foreground text-right">
                      {percent}%
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Latest 5 Review Comments List */}
          <div className="flex flex-col gap-3">
            {displayedReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-3.5 rounded-2xl bg-background border border-border flex flex-col gap-2 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-black flex items-center justify-center border border-primary/20">
                      {rev.userInitials}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-extrabold text-foreground">
                          {rev.userName}
                        </span>
                        {rev.verified && (
                          <HugeiconsIcon
                            icon={CheckmarkBadge01Icon}
                            className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10"
                          />
                        )}
                      </div>
                      <span className="text-[10px] text-muted-foreground">{rev.date}</span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <HugeiconsIcon
                        key={i}
                        icon={StarIcon}
                        className="w-3 h-3 fill-current"
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed pl-0.5">
                  &quot;{rev.comment}&quot;
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTA Button: Add Review */}
          <button
            onClick={() => setIsReviewDrawerOpen(true)}
            className="w-full py-3.5 px-4 rounded-2xl bg-background text-foreground border border-border hover:bg-card text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer mt-1"
          >
            <HugeiconsIcon icon={PencilEdit01Icon} className="w-4 h-4 text-primary" />
            <span>Tulis Ulasan Saya</span>
          </button>
        </div>
      </div>

      {/* REUSABLE WRITE REVIEW DRAWER COMPONENT */}
      <WriteReviewDrawer
        isOpen={isReviewDrawerOpen}
        onClose={() => setIsReviewDrawerOpen(false)}
        onSubmitReview={handleAddReview}
        destinationName={detail.title}
        destinationLocation={detail.location}
        destinationImage={detail.image}
      />

      {/* FLOATING ACTIVE AUDIO PLAYER BAR */}
      <ActiveAudioBar className="bottom-[76px]" />
    </div>
  )
}