"use client"

import { useState } from "react"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  StarIcon,
  CheckmarkBadge01Icon,
  PencilEdit01Icon,
  CheckIcon,
} from "@hugeicons/core-free-icons"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@workspace/ui/components/drawer"
import { QUICK_TAGS } from "@/features/culture/data/culture-detail-data"

export interface WriteReviewDrawerProps {
  isOpen: boolean
  onClose: () => void
  onSubmitReview: (review: { rating: number; comment: string; tags: string[] }) => void
  destinationName?: string
  destinationLocation?: string
  destinationImage?: string
  userName?: string
  userInitials?: string
}

export function WriteReviewDrawer({
  isOpen,
  onClose,
  onSubmitReview,
  destinationName = "Candi Prambanan",
  destinationLocation = "D.I. Yogyakarta",
  destinationImage = "/images/prambanan-hero.png",
  userName = "Aswin",
  userInitials = "A",
}: WriteReviewDrawerProps) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim() && selectedTags.length === 0) return

    onSubmitReview({
      rating,
      comment,
      tags: selectedTags,
    })

    // Reset local form state
    setComment("")
    setSelectedTags([])
    setRating(5)
    onClose()
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()} showSwipeHandle={true}>
      <DrawerContent className="max-h-[85vh] h-auto w-full sm:max-w-md mx-auto rounded-t-3xl border-t border-border bg-card p-0 flex flex-col justify-between">
        {/* Drawer Header */}
        <DrawerHeader className="p-4 border-b border-border text-left shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-border">
              <Image
                src={destinationImage}
                alt={destinationName}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <DrawerTitle className="text-sm font-black text-foreground tracking-tight truncate">
                Tulis Ulasan Wisatawan
              </DrawerTitle>
              <DrawerDescription className="text-[11px] text-muted-foreground truncate">
                {destinationName} • {destinationLocation}
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 flex flex-col gap-4 overflow-y-auto">
          {/* User Profile Prefill */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-background border border-border">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-black flex items-center justify-center border border-primary/20 shrink-0">
              {userInitials}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-extrabold text-foreground">{userName}</span>
                <HugeiconsIcon
                  icon={CheckmarkBadge01Icon}
                  className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10"
                />
              </div>
              <span className="text-[10px] text-muted-foreground">
                Mengulas sebagai Pengunjung Terverifikasi
              </span>
            </div>
          </div>

          {/* Interactive Star Rating Selector */}
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-background border border-border gap-1.5">
            <span className="text-[11px] font-extrabold text-muted-foreground">
              Berapa bintang untuk pengalamanmu?
            </span>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-125 cursor-pointer"
                >
                  <HugeiconsIcon
                    icon={StarIcon}
                    className={`w-7 h-7 ${
                      star <= rating
                        ? "fill-amber-500 text-amber-500"
                        : "text-muted-foreground/25"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-extrabold text-amber-500">
              {rating}.0 •{" "}
              {rating === 5
                ? "Sangat Memuaskan! 🌟"
                : rating === 4
                ? "Sangat Bagus 👍"
                : rating === 3
                ? "Cukup Baik 🙂"
                : "Kurang Memuaskan 😐"}
            </span>
          </div>

          {/* Quick Impression Tag Chips */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-extrabold text-foreground">
              Pilih Kesan Menarik (Opsional)
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {QUICK_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag)
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer border flex items-center gap-1 ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                        : "bg-background text-muted-foreground border-border hover:border-primary/40"
                    }`}
                  >
                    {isSelected && <HugeiconsIcon icon={CheckIcon} className="w-3 h-3" />}
                    <span>{tag}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Review Textarea */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-extrabold text-foreground">
              Detail Pengalaman Anda
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ceritakan narasi audio spot mana yang paling membuat terkesan..."
              className="w-full p-3 rounded-2xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none leading-relaxed"
            />
          </div>

          {/* Form Action Buttons */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-4 rounded-2xl bg-background border border-border text-xs font-extrabold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Batal
            </button>

            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-2xl bg-primary text-primary-foreground text-xs font-black shadow-lg hover:bg-primary/90 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <HugeiconsIcon icon={PencilEdit01Icon} className="w-4 h-4" />
              <span>Kirim Ulasan</span>
            </button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
