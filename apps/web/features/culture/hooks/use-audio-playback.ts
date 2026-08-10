"use client"

import { useCallback, useEffect, useState } from "react"
import type { AudioSpot } from "@/features/culture/data/culture-detail-data"
import { useAudioPlayer, type AudioTrack } from "@/features/audio/hooks/use-audio-player"

const DOWNLOADS_KEY = "voxlore.audio-downloads"

export type DownloadRecord = {
  id: string
  title: string
  siteName: string
  siteId: string
  spotNumber: string
  duration: string
  size: string
  image: string
}

function readDownloadedSpots(): Record<string, DownloadRecord> {
  if (typeof window === "undefined") return {}
  try {
    return JSON.parse(localStorage.getItem(DOWNLOADS_KEY) ?? "{}") as Record<string, DownloadRecord>
  } catch {
    return {}
  }
}

export function useAudioPlayback() {
  const audioCtx = useAudioPlayer()

  const [downloadedSpots, setDownloadedSpots] = useState<Record<string, boolean>>(() => {
    const stored = readDownloadedSpots()
    return Object.fromEntries(Object.keys(stored).map((id) => [id, true]))
  })

  useEffect(() => {
    setDownloadedSpots((prev) => ({
      ...prev,
      ...audioCtx.downloadedSpots,
    }))
  }, [audioCtx.downloadedSpots])

  const handleTogglePlaySpot = useCallback(
    (
      spot: AudioSpot,
      contextInfo?: { title?: string; location?: string; image?: string }
    ) => {
      const track: AudioTrack = {
        id: spot.id,
        title: contextInfo?.title || "Voxlore Guide",
        spotName: `Spot ${spot.spotNumber}: ${spot.title}`,
        location: contextInfo?.location || "Nusantara",
        progressPercent: 0,
        currentTime: "00:00",
        totalTime: spot.duration,
        image: contextInfo?.image || "/images/prambanan-hero.png",
        audioUrl: spot.audioUrl,
      }
      audioCtx.togglePlayTrack(track)
    },
    [audioCtx]
  )

  const handleDownloadSpot = useCallback(
    (
      e: React.MouseEvent | { stopPropagation: () => void },
      spot: AudioSpot,
      contextInfo?: { title?: string; siteName?: string; siteId?: string; image?: string }
    ) => {
      if (e?.stopPropagation) e.stopPropagation()

      const stored = readDownloadedSpots()
      if (downloadedSpots[spot.id] || stored[spot.id]) {
        delete stored[spot.id]
        if (typeof window !== "undefined") {
          localStorage.setItem(DOWNLOADS_KEY, JSON.stringify(stored))
        }
        setDownloadedSpots((prev) => {
          const next = { ...prev }
          delete next[spot.id]
          return next
        })
      } else {
        stored[spot.id] = {
          id: spot.id,
          title: spot.title,
          siteName: contextInfo?.siteName || contextInfo?.title || spot.destinationId || "Situs Budaya",
          siteId: spot.destinationId || contextInfo?.siteId || "culture",
          spotNumber: `Spot ${spot.spotNumber}`,
          duration: spot.duration,
          size: "6.5 MB",
          image: contextInfo?.image || "/images/prambanan-hero.png",
        }
        if (typeof window !== "undefined") {
          localStorage.setItem(DOWNLOADS_KEY, JSON.stringify(stored))
        }
        setDownloadedSpots((prev) => ({ ...prev, [spot.id]: true }))
      }

      audioCtx.handleDownloadSpot(spot.id)
    },
    [audioCtx, downloadedSpots]
  )

  return {
    activeSpotId: audioCtx.currentTrack?.id || null,
    isPlayingSpot: audioCtx.isPlaying,
    setIsPlayingSpot: (playing: boolean) => {
      if (playing) audioCtx.resumeAudio()
      else audioCtx.pauseAudio()
    },
    downloadedSpots,
    downloadProgress: audioCtx.downloadProgress,
    handleTogglePlaySpot,
    handleDownloadSpot,
    dismissAudio: audioCtx.dismissAudio,
    audioCtx,
  }
}
