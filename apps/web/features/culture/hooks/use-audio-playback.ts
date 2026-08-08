"use client"

import { useState, useCallback } from "react"
import type { AudioSpot } from "@/features/culture/data/culture-detail-data"

export function useAudioPlayback() {
  const [activeSpotId, setActiveSpotId] = useState<string | null>(null)
  const [isPlayingSpot, setIsPlayingSpot] = useState(false)
  const [downloadedSpots, setDownloadedSpots] = useState<Record<string, boolean>>({})
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({})

  const handleTogglePlaySpot = useCallback(
    (spot: AudioSpot) => {
      if (activeSpotId === spot.id) {
        setIsPlayingSpot((prev) => !prev)
      } else {
        setActiveSpotId(spot.id)
        setIsPlayingSpot(true)
      }
    },
    [activeSpotId]
  )

  const handleDownloadSpot = useCallback(
    (e: React.MouseEvent, spot: AudioSpot) => {
      e.stopPropagation()
      const isAlreadyDownloaded = !!downloadedSpots[spot.id]

      if (isAlreadyDownloaded) {
        setDownloadedSpots((prev) => ({
          ...prev,
          [spot.id]: false,
        }))
        return
      }

      if (downloadProgress[spot.id] !== undefined) return

      setDownloadProgress((prev) => ({ ...prev, [spot.id]: 15 }))

      let progress = 15
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 15
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setDownloadProgress((prev) => {
            const copy = { ...prev }
            delete copy[spot.id]
            return copy
          })
          setDownloadedSpots((prev) => ({
            ...prev,
            [spot.id]: true,
          }))
        } else {
          setDownloadProgress((prev) => ({
            ...prev,
            [spot.id]: progress,
          }))
        }
      }, 140)
    },
    [downloadedSpots, downloadProgress]
  )

  const dismissAudio = useCallback(() => {
    setActiveSpotId(null)
    setIsPlayingSpot(false)
  }, [])

  return {
    activeSpotId,
    isPlayingSpot,
    setIsPlayingSpot,
    downloadedSpots,
    downloadProgress,
    handleTogglePlaySpot,
    handleDownloadSpot,
    dismissAudio,
  }
}
