"use client"

import { useState } from "react"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  PlayIcon,
  PauseIcon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons"

export interface ActiveAudioTrack {
  id: string
  title: string
  spotName: string
  location: string
  progressPercent: number
  currentTime: string
  totalTime: string
  image: string
}

export const CURRENT_ACTIVE_AUDIO: ActiveAudioTrack = {
  id: "prambanan-spot-1",
  title: "Candi Prambanan",
  spotName: "Spot 1: Pelataran & Gapura Utama",
  location: "Sleman, Yogyakarta",
  progressPercent: 45,
  currentTime: "03:15",
  totalTime: "07:30",
  image: "/images/prambanan-hero.png",
}

interface FloatingAudioBarProps {
  onOpenPlayer?: () => void
  onDismiss?: () => void
}

export function ActiveAudioBar({ onOpenPlayer, onDismiss }: FloatingAudioBarProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlaying(!isPlaying)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDismissed(true)
    onDismiss?.()
  }

  return (
    <div
      onClick={onOpenPlayer}
      className="fixed bottom-[74px] inset-x-0 w-[calc(100%-2rem)] sm:max-w-[416px] mx-auto z-30 bg-primary text-primary-foreground rounded-2xl border border-white/15 shadow-2xl p-2.5 sm:p-3 flex flex-col gap-2 cursor-pointer"
    >
      <div className="flex items-center justify-between gap-3">
        {/* Track Thumbnail */}
        <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-white/15">
          <Image
            src={CURRENT_ACTIVE_AUDIO.image}
            alt={CURRENT_ACTIVE_AUDIO.title}
            fill
            className="object-cover"
            sizes="44px"
          />
        </div>

        {/* Track Info */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
            <span className="text-xs font-extrabold text-white truncate">
              {CURRENT_ACTIVE_AUDIO.title}
            </span>
          </div>
          <span className="text-[11px] text-white/70 truncate font-medium">
            {CURRENT_ACTIVE_AUDIO.spotName}
          </span>
        </div>

        {/* Controls: Play/Pause & Dismiss */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Jeda Audio" : "Putar Audio"}
            className="w-9 h-9 rounded-full bg-white text-primary flex items-center justify-center cursor-pointer shadow-xs"
          >
            <HugeiconsIcon
              icon={isPlaying ? PauseIcon : PlayIcon}
              className="w-4 h-4 fill-current ml-0.5"
            />
          </button>

          <button
            onClick={handleClose}
            aria-label="Tutup Pemutar Floating"
            className="w-7 h-7 rounded-full text-white/50 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${CURRENT_ACTIVE_AUDIO.progressPercent}%` }}
        />
      </div>
    </div>
  )
}
