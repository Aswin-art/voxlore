"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  PlayIcon,
  PauseIcon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons"
import { useAudioPlayer, type AudioTrack } from "@/features/audio/hooks/use-audio-player"

export type ActiveAudioTrack = AudioTrack

export const CURRENT_ACTIVE_AUDIO: ActiveAudioTrack = {
  id: "prambanan-spot-1",
  title: "Candi Prambanan",
  spotName: "Spot 1: Pelataran & Gapura Utama",
  location: "Sleman, Yogyakarta",
  progressPercent: 0,
  currentTime: "00:00",
  totalTime: "07:30",
  image: "/images/prambanan-hero.png",
  audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
}

interface FloatingAudioBarProps {
  track?: ActiveAudioTrack | null
  isPlaying?: boolean
  onTogglePlay?: () => void
  onOpenPlayer?: () => void
  onDismiss?: () => void
  className?: string
}

export function ActiveAudioBar({
  track: propTrack,
  isPlaying: externalIsPlaying,
  onTogglePlay,
  onOpenPlayer,
  onDismiss,
  className = "bottom-[76px]",
}: FloatingAudioBarProps) {
  const audioCtx = useAudioPlayer()
  const [isDismissed, setIsDismissed] = useState(false)

  const activeTrack = propTrack !== undefined ? propTrack : audioCtx.currentTrack
  const isPlaying = externalIsPlaying !== undefined ? externalIsPlaying : audioCtx.isPlaying
  const progressPct = propTrack ? (propTrack.progressPercent || 0) : audioCtx.progressPercent

  useEffect(() => {
    if (activeTrack?.id && isPlaying) {
      setIsDismissed(false)
    }
  }, [activeTrack?.id, isPlaying])

  if (!activeTrack || isDismissed) return null

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onTogglePlay) {
      onTogglePlay()
    } else {
      audioCtx.togglePlayTrack(activeTrack)
    }
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDismissed(true)
    if (onDismiss) {
      onDismiss()
    } else {
      audioCtx.dismissAudio()
    }
  }

  return (
    <div
      onClick={onOpenPlayer}
      className={`fixed inset-x-0 w-[calc(100%-2rem)] sm:max-w-[416px] mx-auto z-50 bg-primary text-primary-foreground rounded-2xl border border-white/15 shadow-2xl p-2.5 sm:p-3 flex flex-col gap-2 cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-300 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Track Thumbnail */}
        <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-white/15">
          <Image
            src={activeTrack.image}
            alt={activeTrack.title}
            fill
            className="object-cover"
            sizes="44px"
          />
        </div>

        {/* Track Info */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-emerald-400 animate-ping" : "bg-white/40"}`} />
            <span className="text-xs font-extrabold text-white truncate">
              {activeTrack.title}
            </span>
          </div>
          <span className="text-[11px] text-white/80 truncate font-medium">
            {activeTrack.spotName}
          </span>
        </div>

        {/* Controls: Play/Pause & Dismiss */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Jeda Audio" : "Putar Audio"}
            className="w-9 h-9 rounded-full bg-white text-primary flex items-center justify-center cursor-pointer shadow-xs hover:scale-105 transition-transform"
          >
            <HugeiconsIcon
              icon={isPlaying ? PauseIcon : PlayIcon}
              className="w-4 h-4 fill-current ml-0.5"
            />
          </button>

          <button
            onClick={handleClose}
            aria-label="Tutup Pemutar Floating"
            className="w-7 h-7 rounded-full text-white/60 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-400 rounded-full transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </div>
  )
}
