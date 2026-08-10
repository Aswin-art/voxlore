"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { AudioSpot } from "@/features/culture/data/culture-detail-data"

const DOWNLOADS_KEY = "voxlore.audio-downloads"

type DownloadRecord = {
  id: string
  title: string
  siteName: string
  siteId: string
  spotNumber: string
  duration: string
  size: string
  image: string
}

function readDownloadedSpots() {
  if (typeof window === "undefined") return {}
  try {
    return JSON.parse(localStorage.getItem(DOWNLOADS_KEY) ?? "{}") as Record<string, DownloadRecord>
  } catch {
    return {}
  }
}

export function useAudioPlayback() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [activeSpotId, setActiveSpotId] = useState<string | null>(null)
  const [isPlayingSpot, setIsPlayingSpot] = useState(false)
  const [downloadedSpots, setDownloadedSpots] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(Object.keys(readDownloadedSpots()).map((id) => [id, true])),
  )
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({})

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  const handleTogglePlaySpot = useCallback(
    (spot: AudioSpot) => {
      if (!spot.audioUrl) return
      if (activeSpotId === spot.id && audioRef.current) {
        if (audioRef.current.paused) {
          void audioRef.current.play()
        } else {
          audioRef.current.pause()
        }
        return
      }

      audioRef.current?.pause()
      const audio = new Audio(spot.audioUrl)
      audio.onplay = () => setIsPlayingSpot(true)
      audio.onpause = () => setIsPlayingSpot(false)
      audio.onended = () => setIsPlayingSpot(false)
      audio.onerror = () => {
        setActiveSpotId(null)
        setIsPlayingSpot(false)
      }
      audioRef.current = audio
      setActiveSpotId(spot.id)
      void audio.play().catch(() => {
        setActiveSpotId(null)
        setIsPlayingSpot(false)
      })
    },
    [activeSpotId],
  )

  const handleDownloadSpot = useCallback(
    async (e: React.MouseEvent, spot: AudioSpot) => {
      e.stopPropagation()
      if (!spot.audioUrl || downloadedSpots[spot.id] || downloadProgress[spot.id] !== undefined) return

      setDownloadProgress((prev) => ({ ...prev, [spot.id]: 0 }))
      try {
        const response = await fetch(
          `/api/destinations/${encodeURIComponent(spot.destinationId)}/audio/${spot.spotNumber}/download`,
        )
        if (!response.ok) throw new Error(`Download failed (${response.status})`)
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const anchor = document.createElement("a")
        anchor.href = url
        anchor.download = `${spot.id}.mp3`
        anchor.click()
        window.setTimeout(() => URL.revokeObjectURL(url), 1000)
        const stored = readDownloadedSpots()
        stored[spot.id] = {
          id: spot.id,
          title: spot.title,
          siteName: spot.destinationId,
          siteId: spot.destinationId,
          spotNumber: `Spot ${spot.spotNumber}`,
          duration: spot.duration,
          size: `${(blob.size / 1024 / 1024).toFixed(1)} MB`,
          image: "",
        }
        localStorage.setItem(DOWNLOADS_KEY, JSON.stringify(stored))
        setDownloadedSpots((prev) => ({ ...prev, [spot.id]: true }))
      } finally {
        setDownloadProgress((prev) => {
          const next = { ...prev }
          delete next[spot.id]
          return next
        })
      }
    },
    [downloadProgress, downloadedSpots],
  )

  const dismissAudio = useCallback(() => {
    audioRef.current?.pause()
    audioRef.current = null
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
