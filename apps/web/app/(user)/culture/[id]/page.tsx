"use client"

import { useState, use } from "react"
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
} from "@hugeicons/core-free-icons"
import { WriteReviewDrawer } from "@/features/culture/components/write-review-drawer"

export interface AudioSpot {
  id: string
  spotNumber: number
  title: string
  duration: string
  description: string
}

export interface UserReview {
  id: string
  userName: string
  userInitials: string
  rating: number
  date: string
  comment: string
  verified: boolean
}

export interface RatingBreakdown {
  5: number
  4: number
  3: number
  2: number
  1: number
}

export interface CultureDetail {
  id: string
  title: string
  subtitle: string
  location: string
  price: string
  rating: number
  reviewsCount: number
  duration: string
  image: string
  description: string
  audioSpots: AudioSpot[]
  reviews: UserReview[]
  ratingBreakdown: RatingBreakdown
}

const DETAIL_DATA: Record<string, CultureDetail> = {
  prambanan: {
    id: "prambanan",
    title: "Candi Prambanan",
    subtitle: "Kemegahan Arsitektur Trimurti & Legenda Roro Jonggrang",
    location: "Sleman, D.I. Yogyakarta",
    price: "Rp 25.000",
    rating: 4.9,
    reviewsCount: 1280,
    duration: "45-60 min",
    image: "/images/prambanan-hero.png",
    description:
      "Candi Prambanan merupakan kompleks candi Hindu terbesar di Indonesia yang dibangun pada abad ke-9 Masehi. Didedikasikan untuk Trimurti: Brahma (Pencipta), Shiva (Pemerelihara), dan Vishnu (Penyelamat). Nikmati kisah epik Ramayana yang terpahat indah pada relief candi.",
    audioSpots: [
      {
        id: "spot-1",
        spotNumber: 1,
        title: "Pelataran & Gapura Utama",
        duration: "07:30",
        description: "Pengenalan sejarah pendirian dan tata letak kompleks candi.",
      },
      {
        id: "spot-2",
        spotNumber: 2,
        title: "Candi Shiva & Relief Ramayana",
        duration: "12:15",
        description: "Penjelasan kisah epik Ramayana pada dinding galeri pertama.",
      },
      {
        id: "spot-3",
        spotNumber: 3,
        title: "Arca Durga Mahisasuramardini",
        duration: "08:45",
        description: "Mitos Roro Jonggrang dan makna spiritual arca Dewi Durga.",
      },
      {
        id: "spot-4",
        spotNumber: 4,
        title: "Pelataran Candi Brahma & Vishnu",
        duration: "10:00",
        description: "Filosfi pelestarian dan kehancuran dalam ajaran Trimurti.",
      },
    ],
    ratingBreakdown: {
      5: 88,
      4: 9,
      3: 2,
      2: 1,
      1: 0,
    },
    reviews: [
      {
        id: "r1",
        userName: "Budi Santoso",
        userInitials: "BS",
        rating: 5,
        date: "2 hari lalu",
        comment:
          "Suara narator sangat jernih dan penjelasan legenda Roro Jonggrang di Spot 3 bikin merinding. Terasa membawa pemandu wisata pribadi!",
        verified: true,
      },
      {
        id: "r2",
        userName: "Dian Pratama",
        userInitials: "DP",
        rating: 5,
        date: "1 minggu lalu",
        comment:
          "Sangat membantu saat keliling Candi Prambanan. Penjelasan relief Ramayana detail dan mudah dipahami anak-anak.",
        verified: true,
      },
      {
        id: "r3",
        userName: "Maya Rosalia",
        userInitials: "MR",
        rating: 4,
        date: "2 minggu lalu",
        comment:
          "Audio pasnya oke banget, koneksinya instan tanpa perlu unduh aplikasi tambahan.",
        verified: true,
      },
      {
        id: "r4",
        userName: "Rian Hidayat",
        userInitials: "RH",
        rating: 5,
        date: "3 minggu lalu",
        comment:
          "Pengalaman wisata sejarah terbaik! Sangat disarankan pakai earphone agar narasi lebih imersif.",
        verified: true,
      },
      {
        id: "r5",
        userName: "Siti Rahmawati",
        userInitials: "SR",
        rating: 5,
        date: "1 bulan lalu",
        comment:
          "Relief candi jadi jauh lebih hidup saat mendengarkan penjelasan audio guide ini.",
        verified: true,
      },
    ],
  },
}

const QUICK_TAGS = [
  "Audio Jernih",
  "Narasi Imersif",
  "Alur Edukatif",
  "Musik Etnik Pas",
  "Sangat Direkomendasikan",
]

export default function CultureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const router = useRouter()
  const detail = DETAIL_DATA[resolvedParams.id] || DETAIL_DATA.prambanan!

  const [isFav, setIsFav] = useState(false)
  const [activeSpotId, setActiveSpotId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  // Review Drawer State
  const [isReviewDrawerOpen, setIsReviewDrawerOpen] = useState(false)
  const [reviewsList, setReviewsList] = useState<UserReview[]>(detail.reviews)

  const handleTogglePlaySpot = (spot: AudioSpot) => {
    if (activeSpotId === spot.id) {
      setActiveSpotId(null)
    } else {
      setActiveSpotId(spot.id)
      setToast(`Memutar: ${spot.title}`)
      setTimeout(() => setToast(null), 3000)
    }
  }

  const handleAddReview = (review: { rating: number; comment: string; tags: string[] }) => {
    const tagText = review.tags.length > 0 ? `[${review.tags.join(", ")}] ` : ""
    const fullComment = `${tagText}${review.comment}`

    const createdReview: UserReview = {
      id: `r-${Date.now()}`,
      userName: "Aswin",
      userInitials: "A",
      rating: review.rating,
      date: "Baru saja",
      comment: fullComment,
      verified: true,
    }

    setReviewsList([createdReview, ...reviewsList])
    setToast("Ulasan Anda berhasil diterbitkan! 🎉")
    setTimeout(() => setToast(null), 4000)
  }

  const displayedReviews = reviewsList.slice(0, 5)

  return (
    <div className="flex flex-col min-h-screen bg-card text-foreground pb-12 relative">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-4 left-4 right-4 max-w-sm mx-auto z-50 p-3 bg-primary text-primary-foreground text-xs font-bold rounded-2xl flex items-center justify-between shadow-2xl animate-in fade-in slide-in-from-top-2">
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="opacity-70 hover:opacity-100 ml-2">
            ✕
          </button>
        </div>
      )}

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
              Situs Cagar Budaya
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

        {/* Audio Spot Location Guide List */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-foreground tracking-tight">
              Daftar Titik Audio Spot
            </h2>
            <span className="text-xs font-bold text-muted-foreground">
              {detail.audioSpots.length} Titik Lokasi
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {detail.audioSpots.map((spot) => {
              const isPlayingThis = activeSpotId === spot.id
              return (
                <div
                  key={spot.id}
                  onClick={() => handleTogglePlaySpot(spot)}
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

                    <button
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
                  "{rev.comment}"
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
    </div>
  )
}
