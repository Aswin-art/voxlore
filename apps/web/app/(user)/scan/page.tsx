"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  QrCode01Icon,
  FlashIcon,
} from "@hugeicons/core-free-icons"
import { ActiveAudioBar } from "@/features/dashboard/components/active-audio-bar"

export default function ScanPage() {
  const router = useRouter()
  const [isFlashOn, setIsFlashOn] = useState(false)

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
              Pindai Kode QR
            </h1>
            <span className="text-[11px] text-muted-foreground truncate">
              Audio guide otomatis di lokasi situs
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
      <main className="flex-1 flex flex-col items-center justify-center p-6 gap-6 text-center min-h-0 relative">
        {/* Large Viewfinder Frame */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl border-2 border-border overflow-hidden shadow-lg flex items-center justify-center bg-card/60 backdrop-blur-xs">
          {/* Flashlight simulation effect */}
          {isFlashOn && (
            <div className="absolute inset-0 bg-primary/10 transition-all pointer-events-none" />
          )}

          {/* Corner Bracket Frame Indicators */}
          <div className="absolute top-4 left-4 w-9 h-9 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
          <div className="absolute top-4 right-4 w-9 h-9 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
          <div className="absolute bottom-4 left-4 w-9 h-9 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
          <div className="absolute bottom-4 right-4 w-9 h-9 border-b-4 border-r-4 border-primary rounded-br-2xl" />

          {/* Animated Scanning Laser Line */}
          <div
            className="absolute inset-x-0 h-0.5 bg-primary shadow-xs animate-pulse"
            style={{ animation: "scanLine 2.2s infinite ease-in-out" }}
          />

          {/* Center Target QR Icon */}
          <div className="flex flex-col items-center gap-2 text-muted-foreground animate-pulse pointer-events-none">
            <HugeiconsIcon icon={QrCode01Icon} className="w-16 h-16 text-primary" />
            <span className="text-[11px] font-extrabold tracking-widest uppercase text-foreground">
              Mencari Kode QR...
            </span>
          </div>
        </div>

        {/* Minimalist Subtext Guidance */}
        <div className="flex flex-col items-center gap-1 max-w-xs">
          <span className="text-xs font-extrabold text-foreground">
            Arahkan Kamera ke Papan Kode QR Voxlore
          </span>
          <span className="text-[11px] text-muted-foreground leading-relaxed">
            Posisikan kode QR di dalam bingkai untuk memutar audio guide otomatis.
          </span>
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
