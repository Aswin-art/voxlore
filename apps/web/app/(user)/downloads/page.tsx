"use client"

import { Suspense, useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  Download01Icon,
  PlayIcon,
  Delete01Icon,
  Search01Icon,
  Cancel01Icon,
  Clock01Icon,
  Location01Icon,
  PauseIcon,
} from "@hugeicons/core-free-icons"
import ErrorBoundary from "@/components/error-boundary"
import { Skeleton } from "@workspace/ui/components/skeleton"

export interface DownloadedAudioSpot {
  id: string
  title: string
  siteName: string
  siteId: string
  spotNumber: string
  duration: string
  size: string
  image: string
}

const DOWNLOADS_KEY = "voxlore.audio-downloads"

function DownloadsPageSkeleton() {
  return (
    <div className="flex flex-col pb-28 relative w-full min-w-0">
      <header className="sticky top-0 z-30 bg-card p-4 sm:p-5 border-b border-border/60 shadow-xs flex items-center gap-3 w-full min-w-0">
        <Skeleton className="w-9 h-9 rounded-2xl" />
        <div className="flex flex-col gap-2 min-w-0">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3 w-48" />
        </div>
      </header>
      <div className="p-4 sm:p-5 flex flex-col gap-4 w-full">
        <Skeleton className="h-16 w-full rounded-3xl" />
        <Skeleton className="h-11 w-full rounded-2xl" />
        <Skeleton className="h-16 w-full rounded-2xl" />
        <Skeleton className="h-16 w-full rounded-2xl" />
        <Skeleton className="h-16 w-full rounded-2xl" />
      </div>
    </div>
  )
}

export default function DownloadsPage() {
  return (
    <Suspense fallback={<DownloadsPageSkeleton />}>
      <ErrorBoundary label="Audio Luring">
        <DownloadsPageContent />
      </ErrorBoundary>
    </Suspense>
  )
}

function DownloadsPageContent() {
  const router = useRouter()
  const [tracks, setTracks] = useState<DownloadedAudioSpot[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(DOWNLOADS_KEY) ?? "{}") as Record<string, DownloadedAudioSpot>
      setTracks(Object.values(stored))
    } catch {
      setTracks([])
    }
  }, [])
  const [toast, setToast] = useState<string | null>(null)
  const [playingId, setPlayingId] = useState<string | null>(null)

  const handleDeleteTrack = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setTracks((prev) => {
      const next = prev.filter((item) => item.id !== id)
      localStorage.setItem(DOWNLOADS_KEY, JSON.stringify(Object.fromEntries(next.map((item) => [item.id, item]))))
      return next
    })
    if (playingId === id) setPlayingId(null)
    setToast(`Audio "${title}" dihapus dari unduhan 🗑️`)
    setTimeout(() => setToast(null), 3000)
  }

  const handleClearAll = () => {
    if (tracks.length === 0) return
    setTracks([])
    localStorage.removeItem(DOWNLOADS_KEY)
    setPlayingId(null)
    setToast("Semua trek audio luring berhasil dihapus 🧹")
    setTimeout(() => setToast(null), 3000)
  }

  const handleTogglePlay = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (playingId === id) {
      setPlayingId(null)
      setToast(`Dihentikan: "${title}" ⏸️`)
    } else {
      setPlayingId(id)
      setToast(`Memutar luring: "${title}" 🎧`)
    }
    setTimeout(() => setToast(null), 3000)
  }

  const filteredTracks = tracks.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.siteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.spotNumber.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalSizeMB = tracks.reduce((acc, item) => {
    const num = parseFloat(item.size)
    return acc + (isNaN(num) ? 0 : num)
  }, 0)

  return (
    <div className="flex flex-col pb-28 relative w-full min-w-0">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-4 left-4 right-4 max-w-sm mx-auto z-50 p-3 bg-primary text-primary-foreground text-xs font-bold rounded-2xl flex items-center justify-between shadow-2xl animate-in fade-in slide-in-from-top-2">
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="opacity-70 hover:opacity-100 ml-2 cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-30 bg-card p-4 sm:p-5 border-b border-border/60 shadow-xs flex items-center gap-3 w-full min-w-0">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-2xl border border-border bg-background flex items-center justify-center text-foreground hover:bg-card transition-colors cursor-pointer shrink-0"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
        </button>
        <div className="flex flex-col min-w-0">
          <h1 className="text-lg font-extrabold text-foreground tracking-tight truncate">
            Audio Luring (Offline)
          </h1>
          <span className="text-xs text-muted-foreground truncate">
            Kumpulan trek suara &amp; kisah budaya tersimpan
          </span>
        </div>
      </header>

      {/* Page Content Body */}
      <div className="p-4 sm:p-5 flex flex-col gap-4 w-full">
        {/* Storage Overview Banner */}
        <div className="p-4 rounded-3xl bg-card border border-border flex items-center justify-between shadow-2xs w-full min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
              <HugeiconsIcon icon={Download01Icon} className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-black text-foreground truncate">
                {tracks.length} Trek Audio Tersimpan
              </span>
              <span className="text-[11px] font-bold text-muted-foreground truncate">
                Total memori: <strong className="text-primary">{totalSizeMB.toFixed(1)} MB</strong>
              </span>
            </div>
          </div>

          {tracks.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-3 py-1.5 rounded-xl text-[11px] font-extrabold text-destructive border border-destructive/30 hover:bg-destructive/10 transition-colors cursor-pointer shrink-0 ml-2"
            >
              Hapus Semua
            </button>
          )}
        </div>

        {/* Search Input Bar */}
        <div className="relative flex items-center w-full">
          <HugeiconsIcon
            icon={Search01Icon}
            className="absolute left-3.5 w-4 h-4 text-muted-foreground pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul trek audio atau situs..."
            className="w-full pl-10 pr-8 py-2.5 text-xs bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-card transition-all text-foreground placeholder:text-muted-foreground font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 text-xs text-muted-foreground hover:text-foreground p-1 cursor-pointer"
            >
              <HugeiconsIcon icon={Cancel01Icon} className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Downloaded Individual Audio Tracks List */}
        {filteredTracks.length === 0 ? (
          <div className="p-10 text-center bg-card rounded-3xl border border-border flex flex-col items-center justify-center gap-2 mt-2 w-full">
            <HugeiconsIcon icon={Download01Icon} className="w-10 h-10 text-muted-foreground/30" />
            <span className="text-xs font-extrabold text-foreground">
              {tracks.length === 0 ? "Belum ada trek audio diunduh" : "Trek audio tidak ditemukan"}
            </span>
            <span className="text-[11px] text-muted-foreground max-w-xs">
              {tracks.length === 0
                ? "Buka halaman situs kebudayaan dan unduh spot audio favoritmu untuk diputar secara offline."
                : `Tidak ada trek audio yang cocok dengan kata kunci "${searchQuery}".`}
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5 w-full min-w-0">
            {filteredTracks.map((track) => {
              const isPlaying = playingId === track.id

              return (
                <div
                  key={track.id}
                  onClick={(e) => handleTogglePlay(track.id, track.title, e)}
                  className={`w-full bg-card rounded-2xl border p-3 flex items-center gap-3 transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-md min-w-0 ${
                    isPlaying
                      ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                      : "border-border hover:border-border/80"
                  }`}
                >
                  {/* Square Image Thumbnail with Audio Indicator */}
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-border/50">
                    <Image
                      src={track.image}
                      alt={track.title}
                      fill
                      className="object-cover brightness-90"
                      sizes="48px"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <HugeiconsIcon
                        icon={isPlaying ? PauseIcon : PlayIcon}
                        className={`w-5 h-5 ${isPlaying ? "text-primary fill-primary animate-pulse" : "text-white fill-white"}`}
                      />
                    </div>
                  </div>

                  {/* Track Information Details */}
                  <div className="flex flex-col justify-center flex-1 min-w-0">
                    <h3 className="text-xs font-extrabold text-foreground tracking-tight truncate leading-snug">
                      {track.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-1 text-[10px] font-bold text-muted-foreground min-w-0">
                      <div className="flex items-center gap-1 text-primary shrink-0">
                        <HugeiconsIcon icon={Location01Icon} className="w-3 h-3 text-destructive" />
                        <span className="truncate max-w-[120px]">{track.siteName}</span>
                      </div>

                      <span className="text-muted-foreground/40">•</span>

                      <span className="bg-background border border-border px-1.5 py-0.5 rounded-md text-foreground shrink-0 font-extrabold">
                        {track.spotNumber}
                      </span>

                      <span className="text-muted-foreground/40">•</span>

                      <div className="flex items-center gap-0.5 shrink-0">
                        <HugeiconsIcon icon={Clock01Icon} className="w-3 h-3" />
                        <span>{track.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Metadata & Single Delete Button */}
                  <div className="flex items-center gap-2 shrink-0 ml-1">
                    <span className="text-[10px] font-black text-primary hidden sm:inline">
                      {track.size}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleDeleteTrack(track.id, track.title, e)}
                      className="w-8 h-8 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                      title="Hapus Audio"
                    >
                      <HugeiconsIcon icon={Delete01Icon} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
