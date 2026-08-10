"use client"

import { useCallback } from "react"
import type { AudioSpot } from "@/features/culture/data/culture-detail-data"
import { useAudioPlayer, type AudioTrack } from "@/features/audio/hooks/use-audio-player"

export function useAudioPlayback() {
  const audioCtx = useAudioPlayer()

  const handleTogglePlaySpot = useCallback(
    (spot: AudioSpot, contextInfo?: { title: string; location: string; image: string }) => {
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
    (e: React.MouseEvent, spot: AudioSpot) => {
      e.stopPropagation()
      audioCtx.handleDownloadSpot(spot.id)
    },
    [audioCtx]
  )

  return {
    activeSpotId: audioCtx.currentTrack?.id || null,
    isPlayingSpot: audioCtx.isPlaying,
    setIsPlayingSpot: (playing: boolean) => {
      if (playing) audioCtx.resumeAudio()
      else audioCtx.pauseAudio()
    },
    downloadedSpots: audioCtx.downloadedSpots,
    downloadProgress: audioCtx.downloadProgress,
    handleTogglePlaySpot,
    handleDownloadSpot,
    dismissAudio: audioCtx.dismissAudio,
    audioCtx,
  }
}
