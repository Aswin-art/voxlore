"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  QrCode01Icon,
  FlashIcon,
  PlayIcon,
} from "@hugeicons/core-free-icons"
import { ActiveAudioBar } from "@/features/dashboard/components/active-audio-bar"
import { useAudioPlayer, type AudioTrack } from "@/features/audio/context/audio-context"

const SAMPLE_AUDIO_SPOTS: {
  id: string
  name: string
  spotName: string
  qrPath: string
  track: AudioTrack
}[] = [
  {
    id: "borobudur-spot-1",
    name: "Candi Borobudur",
    spotName: "Spot 1: Stupa Utama & Relief Lalitavistara",
    qrPath: "/qr/borobudur-qr.png",
    track: {
      id: "borobudur-spot-1",
      title: "Candi Borobudur",
      spotName: "Spot 1: Stupa Utama & Relief Lalitavistara",
      location: "Magelang, Jawa Tengah",
      progressPercent: 0,
      currentTime: "00:00",
      totalTime: "12:45",
      image: "/assets/destinations/borobudur.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
  },
  {
    id: "prambanan-spot-1",
    name: "Candi Prambanan",
    spotName: "Spot 1: Pelataran & Gapura Utama",
    qrPath: "/qr/prambanan-qr.png",
    track: {
      id: "prambanan-spot-1",
      title: "Candi Prambanan",
      spotName: "Spot 1: Pelataran & Gapura Utama",
      location: "Sleman, DI Yogyakarta",
      progressPercent: 0,
      currentTime: "00:00",
      totalTime: "07:30",
      image: "/assets/destinations/prambanan.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
  },
  {
    id: "tsunami-museum-spot-1",
    name: "Museum Tsunami Aceh",
    spotName: "Spot 1: Lorong Cerobong Doa",
    qrPath: "/qr/tsunami-museum-qr.png",
    track: {
      id: "tsunami-museum-spot-1",
      title: "Museum Tsunami Aceh",
      spotName: "Spot 1: Lorong Cerobong Doa",
      location: "Kota Banda Aceh, Aceh",
      progressPercent: 0,
      currentTime: "00:00",
      totalTime: "09:15",
      image: "/assets/destinations/tsunami-museum.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
  },
  {
    id: "bromo-spot-1",
    name: "Gunung Bromo",
    spotName: "Spot 1: Lautan Pasir & Kawah Bromo",
    qrPath: "/qr/bromo-qr.png",
    track: {
      id: "bromo-spot-1",
      title: "Taman Nasional Bromo",
      spotName: "Spot 1: Lautan Pasir & Kawah Bromo",
      location: "Probolinggo, Jawa Timur",
      progressPercent: 0,
      currentTime: "00:00",
      totalTime: "11:20",
      image: "/assets/destinations/bromo.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
  },
]

export function ScanPage() {
  const router = useRouter()
  const [isFlashOn, setIsFlashOn] = useState(false)
  const { playTrack } = useAudioPlayer()

  const handleScanSpot = (spotTrack: AudioTrack) => {
    playTrack(spotTrack)
    router.push("/home")
  }

  return (
    <div className="flex flex-col h-[calc(100vh-96px)] max-h-screen bg-background text-foreground relative w-full min-w-0 overflow-hidden">
      {/* Header Bar */}
      <header className="shrink-0 bg-card/95 backdrop-blur-md p-4 sm:p-5 border-b border-border/60 shadow-xs flex items-center justify-between gap-3 w-full min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-2xl border border-border bg-background flex items-center justify-center text-foreground hover:bg-card transition-colors cursor-pointer shrink-0"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
          </button>
          <div className="flex flex-col min-w-0">
            <h1 className="text-base font-extrabold text-foreground tracking-tight truncate">
              Pindai Audio Spot QR
            </h1>
            <span className="text-[11px] text-muted-foreground truncate">
              Arahkan ke QR code spot untuk langsung memutar audio
            </span>
          </div>
        </div>

        {/* Torch / Flash Toggle Button */}
        <button
          onClick={() => setIsFlashOn(!isFlashOn)}
          className={`w-9 h-9 rounded-2xl border flex items-center justify-center transition-all cursor-pointer ${
            isFlashOn
              ? "bg-primary text-primary-foreground border-primary shadow-xs"
              : "bg-background text-muted-foreground border-border hover:text-foreground"
          }`}
          title="Lampu Kilat / Flash"
        >
          <HugeiconsIcon icon={FlashIcon} className="w-5 h-5 fill-current" />
        </button>
      </header>

      {/* Main Single-Screen Centered Viewfinder Box */}
      <main className="flex-1 flex flex-col items-center justify-center p-5 sm:p-6 gap-5 text-center min-h-0 relative overflow-y-auto">
        {/* Large Viewfinder Frame */}
        <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-3xl border-2 border-border overflow-hidden shadow-lg flex items-center justify-center bg-card/60 backdrop-blur-xs shrink-0">
          {/* Flashlight simulation effect */}
          {isFlashOn && (
            <div className="absolute inset-0 bg-primary/10 transition-all pointer-events-none" />
          )}

          {/* Corner Bracket Frame Indicators */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-2xl" />

          {/* Animated Scanning Laser Line */}
          <div
            className="absolute inset-x-0 h-0.5 bg-primary shadow-xs animate-pulse"
            style={{ animation: "scanLine 2.2s infinite ease-in-out" }}
          />

          {/* Center Target QR Icon */}
          <div className="flex flex-col items-center gap-2 text-muted-foreground animate-pulse pointer-events-none">
            <HugeiconsIcon icon={QrCode01Icon} className="w-14 h-14 text-primary" />
            <span className="text-[10px] font-extrabold tracking-widest uppercase text-foreground">
              Mencari Audio Spot QR...
            </span>
          </div>
        </div>

        {/* Minimalist Subtext Guidance */}
        <div className="flex flex-col items-center gap-1 max-w-xs">
          <span className="text-xs font-extrabold text-foreground">
            Arahkan Kamera ke Kode QR Audio Spot
          </span>
          <span className="text-[11px] text-muted-foreground leading-relaxed">
            Pemindaian berhasil akan langsung memutar narasi audio &amp; kembali ke Halaman Utama.
          </span>
        </div>

        {/* Simulation Shortcuts Bar */}
        <div className="w-full max-w-sm pt-3 border-t border-border/60 flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              Simulasi Pindai Audio Spot
            </span>
            <span className="text-[10px] font-semibold text-primary">Redirect ke /home</span>
          </div>

          <div className="flex flex-col gap-2">
            {SAMPLE_AUDIO_SPOTS.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-card border border-border hover:border-primary/50 flex items-center justify-between transition-all group shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => handleScanSpot(item.track)}
                  className="flex flex-col text-left min-w-0 flex-1 cursor-pointer pr-2"
                >
                  <span className="text-xs font-extrabold text-foreground truncate group-hover:text-primary transition-colors flex items-center gap-1.5">
                    <HugeiconsIcon icon={PlayIcon} className="w-3.5 h-3.5 text-primary shrink-0" />
                    {item.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate pl-5">
                    {item.spotName}
                  </span>
                </button>
                <a
                  href={item.qrPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-xl bg-primary/10 text-primary text-[10px] font-bold hover:bg-primary hover:text-primary-foreground transition-all shrink-0 flex items-center gap-1"
                  title="Lihat Kode QR Poster"
                >
                  <HugeiconsIcon icon={QrCode01Icon} className="w-3 h-3" />
                  QR
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Floating Mini Audio Bar */}
      <ActiveAudioBar className="bottom-[76px]" />

      <style jsx global>{`
        @keyframes scanLine {
          0% { top: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  )
}
