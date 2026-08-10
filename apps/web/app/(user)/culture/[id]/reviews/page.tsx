"use client"

import { useState, use, useMemo } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  StarIcon,
  CheckmarkBadge01Icon,
  PencilEdit01Icon,
  ThumbsUpIcon,
} from "@hugeicons/core-free-icons"
import { WriteReviewDrawer } from "@/features/culture/components/write-review-drawer"
import { createReview, fetchReviews, toggleHelpfulVote } from "@/features/culture/data/reviews-api"

export interface UserReview {
  id: string
  userName: string
  userInitials: string
  rating: number
  date: string
  comment: string
  verified: boolean
  helpfulCount: number
}

type FilterStar = "all" | 5 | 4 | 3 | 2 | 1

export default function CultureReviewsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const router = useRouter()
  const reviewsQuery = useQuery({
    queryKey: ["reviews", resolvedParams.id],
    queryFn: () => fetchReviews(resolvedParams.id),
  })
  const createReviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => reviewsQuery.refetch(),
  })
  const helpfulMutation = useMutation({
    mutationFn: toggleHelpfulVote,
    onSuccess: () => reviewsQuery.refetch(),
  })

  const reviewsList = useMemo<UserReview[]>(
    () => (reviewsQuery.data ?? []).map((review) => ({
      id: review.id,
      userName: review.userName,
      userInitials: review.userName.slice(0, 2).toUpperCase(),
      rating: review.rating,
      date: new Date(review.createdAt).toLocaleDateString("id-ID"),
      comment: review.comment,
      verified: review.verified,
      helpfulCount: review.helpfulCount,
    })),
    [reviewsQuery.data],
  )

  const [activeFilter, setActiveFilter] = useState<FilterStar>("all")
  const [toast, setToast] = useState<string | null>(null)
  const [helpfulClicked, setHelpfulClicked] = useState<Record<string, boolean>>({})

  // Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const filteredReviews = reviewsList.filter((r) => {
    if (activeFilter === "all") return true
    return r.rating === activeFilter
  })
  const averageRating = reviewsList.length
    ? reviewsList.reduce((sum, review) => sum + review.rating, 0) / reviewsList.length
    : 0
  const ratingPercent = (star: number) =>
    reviewsList.length
      ? Math.round(
          (reviewsList.filter((review) => review.rating === star).length / reviewsList.length) * 100,
        )
      : 0

  const toggleHelpful = async (id: string) => {
    try {
      const result = await helpfulMutation.mutateAsync(id)
      setHelpfulClicked((prev) => ({ ...prev, [id]: result.helpful }))
    } catch (error) {
      setToast(error instanceof Error ? error.message : "Gagal memperbarui vote")
    }
  }

  const handleAddReview = async (review: { rating: number; comment: string; tags: string[] }) => {
    try {
      await createReviewMutation.mutateAsync({
        destinationId: resolvedParams.id,
        rating: review.rating,
        comment: review.comment,
        tags: review.tags,
      })
      setToast("Ulasan Anda berhasil dikirim")
    } catch (error) {
      setToast(error instanceof Error ? error.message : "Ulasan gagal dikirim")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-card text-foreground pb-24 relative">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-4 left-4 right-4 max-w-sm mx-auto z-50 p-3 bg-primary text-primary-foreground text-xs font-bold rounded-2xl flex items-center justify-between shadow-2xl animate-in fade-in slide-in-from-top-2">
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="opacity-70 hover:opacity-100 ml-2">
            ✕
          </button>
        </div>
      )}

      {/* Clean Top Bar (Replacing standard header with back navigation) */}
      <div className="sticky top-0 inset-x-0 z-30 bg-card/95 backdrop-blur-md border-b border-border p-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          aria-label="Kembali"
          className="w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-card transition-colors cursor-pointer shrink-0"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
        </button>

        <div className="flex flex-col min-w-0">
          <h1 className="text-base font-extrabold text-foreground tracking-tight truncate">
            Semua Ulasan Wisatawan
          </h1>
          <span className="text-xs text-muted-foreground truncate">
            {resolvedParams.id} • {reviewsList.length} Ulasan
          </span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-4 sm:p-5 flex flex-col gap-4">
        {/* Rating Breakdown Summary Card */}
        <div className="p-4 rounded-3xl bg-background border border-border flex items-center gap-4 shadow-2xs">
          {/* Big Score */}
          <div className="flex flex-col items-center justify-center pr-4 border-r border-border shrink-0">
            <span className="text-3xl font-black text-foreground leading-none">{averageRating.toFixed(1)}</span>
            <div className="flex items-center gap-0.5 text-amber-500 my-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <HugeiconsIcon key={i} icon={StarIcon} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground font-bold">
              {reviewsList.length} Ulasan
            </span>
          </div>

          {/* Rating Bars (5 Stars to 1 Star) */}
          <div className="flex-1 flex flex-col gap-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const percent = ratingPercent(star)
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

        {/* Complete Filter Chips (Semua, 5 Bintang, 4 Bintang, 3 Bintang, 2 Bintang, 1 Bintang) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: "all", label: "Semua Ulasan" },
            { id: 5, label: "5 Bintang" },
            { id: 4, label: "4 Bintang" },
            { id: 3, label: "3 Bintang" },
            { id: 2, label: "2 Bintang" },
            { id: 1, label: "1 Bintang" },
          ].map((chip) => {
            const isSelected = activeFilter === chip.id
            return (
              <button
                key={chip.id}
                onClick={() => setActiveFilter(chip.id as FilterStar)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-colors cursor-pointer border ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                {chip.label}
              </button>
            )
          })}
        </div>

        {/* Write Review CTA Button */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="w-full py-3 px-4 rounded-2xl bg-primary text-primary-foreground text-xs font-black flex items-center justify-center gap-2 shadow-md hover:bg-primary/90 transition-colors cursor-pointer my-1"
        >
          <HugeiconsIcon icon={PencilEdit01Icon} className="w-4 h-4" />
          <span>Tulis Ulasan Saya</span>
        </button>

        {/* Reviews List */}
        <div className="flex flex-col gap-3">
          {filteredReviews.length === 0 ? (
            <div className="p-8 text-center bg-background rounded-2xl border border-border text-xs text-muted-foreground">
              Belum ada ulasan untuk rating bintang ini.
            </div>
          ) : (
            filteredReviews.map((rev) => {
              const isHelpful = !!helpfulClicked[rev.id]
              return (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-background border border-border flex flex-col gap-2.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary text-xs font-black flex items-center justify-center border border-primary/20">
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
                        <HugeiconsIcon key={i} icon={StarIcon} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed pl-0.5">
                    &quot;{rev.comment}&quot;
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-border/50 text-[11px] text-muted-foreground">
                    <span className="text-[10px] text-muted-foreground">Pengunjung Terverifikasi</span>

                    <button
                      onClick={() => void toggleHelpful(rev.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        isHelpful
                          ? "bg-primary/15 text-primary font-extrabold"
                          : "hover:bg-card text-muted-foreground"
                      }`}
                    >
                      <HugeiconsIcon icon={ThumbsUpIcon} className="w-3.5 h-3.5" />
                      <span>Membantu ({rev.helpfulCount + (isHelpful ? 1 : 0)})</span>
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* REUSABLE WRITE REVIEW DRAWER COMPONENT */}
      <WriteReviewDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmitReview={handleAddReview}
        destinationName="Candi Prambanan"
        destinationLocation="D.I. Yogyakarta"
        destinationImage="/images/prambanan-hero.png"
      />
    </div>
  )
}
