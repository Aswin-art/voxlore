"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  Ticket01Icon,
  Tick01Icon,
  Home01Icon,
  SparklesIcon,
  Download01Icon,
  HeadphonesIcon,
} from "@hugeicons/core-free-icons"
import { ActiveAudioBar } from "@/features/dashboard/components/active-audio-bar"
import { apiRequest } from "@/features/auth/data/api-client"
import { Skeleton } from "@workspace/ui/components/skeleton"

export interface ApiSubscriptionPackage {
  id: string
  name: string
  subtitle: string
  price: string
  numericPrice: number
  period: string
  bestSeller?: boolean
  features: string[]
}

export default function PackageExpiredGatewayPage() {
  const router = useRouter()
  const [packages, setPackages] = useState<ApiSubscriptionPackage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    apiRequest<ApiSubscriptionPackage[]>("/packages")
      .then((data) => {
        if (isMounted) {
          setPackages(Array.isArray(data) ? data : [])
        }
      })
      .catch(() => {
        if (isMounted) setPackages([])
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const paidPackages = packages.filter((pkg) => pkg.numericPrice > 0)

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative w-full min-w-0 pb-28">
      {/* Sticky Header Bar */}
      <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-md p-4 sm:p-5 border-b border-border/60 shadow-xs flex items-center gap-3 w-full min-w-0">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-2xl border border-border bg-background flex items-center justify-center text-foreground hover:bg-card transition-colors cursor-pointer shrink-0"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
        </button>
        <div className="flex flex-col min-w-0">
          <h1 className="text-base font-extrabold text-foreground tracking-tight truncate">
            Akses Audio Terbatas
          </h1>
          <span className="text-[11px] text-muted-foreground truncate">
            Paket berlangganan audio guide telah habis
          </span>
        </div>
      </header>

      {/* Main Gateway Body */}
      <div className="p-4 sm:p-5 flex flex-col gap-5 w-full max-w-md mx-auto">
        {/* Expired Warning Banner Card */}
        <div className="p-5 rounded-3xl bg-card border border-border flex flex-col items-center text-center gap-4 shadow-2xs">
          <div className="w-16 h-16 rounded-full bg-destructive/10 border border-destructive/20 text-destructive flex items-center justify-center">
            <HugeiconsIcon icon={Ticket01Icon} className="w-8 h-8" />
          </div>

          <div className="flex flex-col gap-1">
            <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20 text-[10px] font-black uppercase tracking-wider mx-auto">
              Paket Berlangganan Berakhir
            </span>
            <h2 className="text-lg font-black text-foreground mt-1">
              Kuota Audio Guide Kamu Telah Habis
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
              Masa aktif paket audio kamu telah selesai. Perbarui paket untuk membuka kembali akses narasi sinematik 500+ situs kebudayaan &amp; unduhan luring.
            </p>
          </div>
        </div>

        {/* Benefits Loss Notice */}
        <div className="p-4 rounded-2xl bg-secondary/50 border border-border flex flex-col gap-2.5">
          <span className="text-xs font-black text-foreground">
            Fitur Yang Dibatasi Saat Ini:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5 bg-card p-2 rounded-xl border border-border">
              <HugeiconsIcon icon={HeadphonesIcon} className="w-3.5 h-3.5 text-destructive shrink-0" />
              <span className="truncate">Putar Full Track</span>
            </div>
            <div className="flex items-center gap-1.5 bg-card p-2 rounded-xl border border-border">
              <HugeiconsIcon icon={Download01Icon} className="w-3.5 h-3.5 text-destructive shrink-0" />
              <span className="truncate">Unduhan Luring</span>
            </div>
            <div className="flex items-center gap-1.5 bg-card p-2 rounded-xl border border-border">
              <HugeiconsIcon icon={SparklesIcon} className="w-3.5 h-3.5 text-destructive shrink-0" />
              <span className="truncate">Audio HD 320kbps</span>
            </div>
          </div>
        </div>

        {/* Quick Renewal Plan Options */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black tracking-wider uppercase text-muted-foreground">
              Pilih Paket Perpanjangan:
            </h3>
            <button
              onClick={() => router.push("/packages")}
              className="text-xs font-extrabold text-primary hover:underline cursor-pointer"
            >
              Lihat Semua Paket →
            </button>
          </div>

          {isLoading ? (
            <div className="flex flex-col gap-2.5">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {paidPackages.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => router.push("/packages")}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 shadow-2xs hover:shadow-md ${
                    opt.bestSeller
                      ? "border-primary bg-card ring-1 ring-primary/20"
                      : "border-border bg-card hover:border-border/80"
                  }`}
                >
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-foreground truncate">{opt.name}</span>
                      {opt.bestSeller && (
                        <span className="px-2 py-0.5 rounded-md bg-primary text-primary-foreground text-[9px] font-black uppercase">
                          Populer
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-muted-foreground truncate">{opt.subtitle}</span>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-sm font-black text-foreground">{opt.price}</span>
                    <span className="text-[10px] text-muted-foreground font-bold">/{opt.period}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-2">
          <button
            onClick={() => router.push("/packages")}
            className="w-full py-3.5 px-5 rounded-2xl bg-primary text-primary-foreground font-extrabold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-opacity cursor-pointer"
          >
            <HugeiconsIcon icon={Tick01Icon} className="w-4 h-4" />
            <span>Perbarui Paket Berlangganan Sekarang</span>
          </button>

          <button
            onClick={() => router.push("/home")}
            className="w-full py-3 px-5 rounded-2xl bg-background border border-border text-foreground font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-card transition-colors cursor-pointer"
          >
            <HugeiconsIcon icon={Home01Icon} className="w-4 h-4 text-muted-foreground" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>

      {/* Floating Audio Bar */}
      <ActiveAudioBar className="bottom-[76px]" />
    </div>
  )
}
