"use client"

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react"
import dynamic from "next/dynamic"

const ReactHowler = dynamic(() => import("react-howler"), { ssr: false })

export interface AudioTrack {
  id: string
  title: string
  spotName: string
  location: string
  progressPercent: number
  currentTime: string
  totalTime: string
  image: string
  audioUrl?: string
}

export const DEFAULT_SAMPLE_AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"

export const INITIAL_DEMO_TRACK: AudioTrack = {
  id: "prambanan-spot-1",
  title: "Candi Prambanan",
  spotName: "Spot 1: Pelataran & Gapura Utama",
  location: "Sleman, Yogyakarta",
  progressPercent: 0,
  currentTime: "00:00",
  totalTime: "07:30",
  image: "/images/prambanan-hero.png",
  audioUrl: DEFAULT_SAMPLE_AUDIO_URL,
}

export interface AudioContextValue {
  currentTrack: AudioTrack | null
  isPlaying: boolean
  progressPercent: number
  currentTimeStr: string
  totalTimeStr: string
  volume: number
  isMuted: boolean
  downloadedSpots: Record<string, boolean>
  downloadProgress: Record<string, number>
  playTrack: (track: AudioTrack) => void
  pauseAudio: () => void
  resumeAudio: () => void
  togglePlayTrack: (track?: AudioTrack) => void
  seekToPercent: (percent: number) => void
  setVolume: (vol: number) => void
  toggleMute: () => void
  dismissAudio: () => void
  handleDownloadSpot: (spotId: string) => void
}

const AudioContext = createContext<AudioContextValue | null>(null)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(INITIAL_DEMO_TRACK)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [progressPercent, setProgressPercent] = useState<number>(0)
  const [currentTimeStr, setCurrentTimeStr] = useState<string>("00:00")
  const [totalTimeStr, setTotalTimeStr] = useState<string>("00:00")
  const [volume, setVolumeState] = useState<number>(1.0)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [downloadedSpots, setDownloadedSpots] = useState<Record<string, boolean>>({})
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({})
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const howlerRef = useRef<any>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const audioSrc = currentTrack?.audioUrl || DEFAULT_SAMPLE_AUDIO_URL

  const formatSeconds = (sec: number): string => {
    if (isNaN(sec) || sec < 0) return "00:00"
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  // Update position and progress percentage continuously when playing
  useEffect(() => {
    if (!isPlaying || !isMounted) return

    const interval = setInterval(() => {
      if (howlerRef.current) {
        try {
          const seek = howlerRef.current.seek() as number
          const duration = howlerRef.current.duration() as number
          if (typeof seek === "number" && duration > 0) {
            const pct = Math.min(100, Math.max(0, (seek / duration) * 100))
            setProgressPercent(pct)
            setCurrentTimeStr(formatSeconds(seek))
            setTotalTimeStr(formatSeconds(duration))
          }
        } catch {
          // ignore seek errors before audio metadata loads
        }
      }
    }, 250)

    return () => clearInterval(interval)
  }, [isPlaying, isMounted, currentTrack?.id])

  const playTrack = useCallback((track: AudioTrack) => {
    setCurrentTrack(track)
    setIsPlaying(true)
    setProgressPercent(0)
    setCurrentTimeStr("00:00")
  }, [])

  const pauseAudio = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const resumeAudio = useCallback(() => {
    if (currentTrack) {
      setIsPlaying(true)
    }
  }, [currentTrack])

  const togglePlayTrack = useCallback(
    (track?: AudioTrack) => {
      if (track && track.id !== currentTrack?.id) {
        playTrack(track)
      } else {
        setIsPlaying((prev) => !prev)
      }
    },
    [currentTrack?.id, playTrack]
  )

  const seekToPercent = useCallback((percent: number) => {
    if (howlerRef.current) {
      const duration = howlerRef.current.duration() as number
      if (duration > 0) {
        const targetSeek = (percent / 100) * duration
        howlerRef.current.seek(targetSeek)
        setProgressPercent(percent)
        setCurrentTimeStr(formatSeconds(targetSeek))
      }
    }
  }, [])

  const setVolume = useCallback((vol: number) => {
    setVolumeState(Math.min(1, Math.max(0, vol)))
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  const dismissAudio = useCallback(() => {
    setIsPlaying(false)
    setCurrentTrack(null)
  }, [])

  const handleDownloadSpot = useCallback(
    (spotId: string) => {
      if (downloadedSpots[spotId]) {
        setDownloadedSpots((prev) => ({ ...prev, [spotId]: false }))
        return
      }

      if (downloadProgress[spotId] !== undefined) return

      setDownloadProgress((prev) => ({ ...prev, [spotId]: 15 }))
      let progress = 15

      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 15
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setDownloadProgress((prev) => {
            const copy = { ...prev }
            delete copy[spotId]
            return copy
          })
          setDownloadedSpots((prev) => ({ ...prev, [spotId]: true }))
        } else {
          setDownloadProgress((prev) => ({ ...prev, [spotId]: progress }))
        }
      }, 140)
    },
    [downloadedSpots, downloadProgress]
  )

  const handleLoad = () => {
    if (howlerRef.current) {
      const dur = howlerRef.current.duration() as number
      if (dur > 0) setTotalTimeStr(formatSeconds(dur))
    }
  }

  const handleEnd = () => {
    setProgressPercent(100)
    setIsPlaying(false)
  }

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progressPercent,
        currentTimeStr,
        totalTimeStr,
        volume,
        isMuted,
        downloadedSpots,
        downloadProgress,
        playTrack,
        pauseAudio,
        resumeAudio,
        togglePlayTrack,
        seekToPercent,
        setVolume,
        toggleMute,
        dismissAudio,
        handleDownloadSpot,
      }}
    >
      {children}

      {/* Global persistent ReactHowler instance */}
      {isMounted && currentTrack && (
        <ReactHowler
          ref={howlerRef}
          src={audioSrc}
          playing={isPlaying}
          volume={volume}
          mute={isMuted}
          html5={true}
          onLoad={handleLoad}
          onEnd={handleEnd}
        />
      )}
    </AudioContext.Provider>
  )
}

export function useAudioPlayer() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error("useAudioPlayer harus digunakan di dalam <AudioProvider>")
  }
  return context
}
