"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { QrCode01Icon } from "@hugeicons/core-free-icons"

export default function ScanPage() {
  return (
    <div className="p-6 flex flex-col items-center justify-center gap-6 my-auto text-center min-h-[60vh]">
      <div className="w-20 h-20 rounded-full bg-background text-foreground border border-border shadow-2xs flex items-center justify-center animate-pulse">
        <HugeiconsIcon icon={QrCode01Icon} className="w-10 h-10" />
      </div>

      <div className="flex flex-col gap-1.5 max-w-xs">
        <h1 className="text-xl font-extrabold text-foreground">Pindai Kode QR Wisata</h1>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Arahkan kamera ponselmu ke papan QR Code di lokasi situs budaya untuk mendengarkan narasi audio instan tanpa mengunduh aplikasi.
        </p>
      </div>
    </div>
  )
}
