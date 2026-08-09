"use client"

import { Suspense, useState } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  Tick01Icon,
  Ticket01Icon,
  Cancel01Icon,
  Download01Icon,
} from "@hugeicons/core-free-icons"
import ErrorBoundary from "@/components/error-boundary"
import { Skeleton } from "@workspace/ui/components/skeleton"

function PackagesPageSkeleton() {
  return (
    <div className="flex flex-col pb-28 relative w-full min-w-0">
      <header className="sticky top-0 z-30 bg-card p-4 sm:p-5 border-b border-border/60 shadow-xs flex items-center gap-3 w-full min-w-0">
        <Skeleton className="w-9 h-9 rounded-2xl" />
        <div className="flex flex-col gap-2 min-w-0">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-3 w-56" />
        </div>
      </header>
      <div className="p-4 sm:p-5 flex flex-col gap-5 w-full">
        <Skeleton className="h-44 w-full rounded-3xl" />
        <Skeleton className="h-44 w-full rounded-3xl" />
        <Skeleton className="h-52 w-full rounded-3xl" />
        <Skeleton className="h-44 w-full rounded-3xl" />
      </div>
    </div>
  )
}

export default function PackagesPage() {
  return (
    <Suspense fallback={<PackagesPageSkeleton />}>
      <ErrorBoundary label="Paket Berlangganan">
        <PackagesPageContent />
      </ErrorBoundary>
    </Suspense>
  )
}

function PackagesPageContent() {
  const router = useRouter()
  const [currentPlan, setCurrentPlan] = useState<string>("monthly-destinasi-pass")
  const [toast, setToast] = useState<string | null>(null)
  const [selectedPlanModal, setSelectedPlanModal] = useState<string | null>(null)

  const handleSelectPlan = (planId: string, planName: string) => {
    if (planId === currentPlan) {
      setToast(`Kamu saat ini sedang aktif di paket ${planName} 👍`)
      setTimeout(() => setToast(null), 3000)
      return
    }
    setSelectedPlanModal(planName)
  }

  const handleConfirmUpgrade = (planName: string) => {
    setCurrentPlan(planName.toLowerCase().replace(/\s+/g, "-"))
    setSelectedPlanModal(null)
    setToast(`Selamat! Berhasil beralih ke paket ${planName} 🎉`)
    setTimeout(() => setToast(null), 3500)
  }

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

      {/* Sticky Navigation Header (Matching home-header.tsx sticky behavior) */}
      <header className="sticky top-0 z-30 bg-card p-4 sm:p-5 border-b border-border/60 shadow-xs flex items-center gap-3 w-full min-w-0">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-2xl border border-border bg-background flex items-center justify-center text-foreground hover:bg-card transition-colors cursor-pointer shrink-0"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
        </button>
        <div className="flex flex-col min-w-0">
          <h1 className="text-lg font-extrabold text-foreground tracking-tight truncate">
            Paket Berlangganan
          </h1>
          <span className="text-xs text-muted-foreground truncate">
            Buka akses tak terbatas kisah audio guide Nusantara
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="p-4 sm:p-5 flex flex-col gap-5 w-full">
        {/* Subscription Cards List */}
        <div className="flex flex-col gap-4 w-full">
          {/* Tier 1: Sampel Gratis (Freemium) */}
          <div className="p-5 rounded-3xl bg-card border border-border flex flex-col gap-4 shadow-2xs">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-black text-foreground">Sampel Gratis</h3>
                <p className="text-xs text-muted-foreground">Freemium — membangun kepercayaan sebelum upgrade</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-foreground">Rp 0</span>
                <span className="text-[10px] text-muted-foreground font-semibold block">/selamanya</span>
              </div>
            </div>

            <div className="h-px bg-border/60 w-full" />

            <ul className="flex flex-col gap-2.5 text-xs text-muted-foreground font-medium">
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={Tick01Icon} className="w-4 h-4 text-primary shrink-0" />
                <span>Akses 3 Audio Guide populer</span>
              </li>
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={Tick01Icon} className="w-4 h-4 text-primary shrink-0" />
                <span>Kualitas suara standar (64 kbps)</span>
              </li>
              <li className="flex items-center gap-2 opacity-40">
                <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="line-through">Tidak mendukung unduhan luring</span>
              </li>
            </ul>

            <button
              onClick={() => handleSelectPlan("free", "Sampel Gratis")}
              className="w-full py-3 rounded-2xl bg-background border border-border text-xs font-extrabold text-foreground hover:bg-card transition-colors cursor-pointer"
            >
              Pilih Paket Gratis
            </button>
          </div>

          {/* Tier 2: Weekly Vacation Pass */}
          <div className="p-5 rounded-3xl bg-card border border-border flex flex-col gap-4 shadow-2xs">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-black text-foreground">Weekly Vacation Pass</h3>
                <p className="text-xs text-muted-foreground">Terbaik untuk turis liburan satu minggu</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-foreground">Rp 29.000</span>
                <span className="text-[10px] text-muted-foreground font-semibold block">/minggu</span>
              </div>
            </div>

            <div className="h-px bg-border/60 w-full" />

            <ul className="flex flex-col gap-2.5 text-xs text-muted-foreground font-medium">
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={Tick01Icon} className="w-4 h-4 text-primary shrink-0" />
                <span>Akses penuh 7 hari ke semua audio guide</span>
              </li>
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={Download01Icon} className="w-4 h-4 text-primary shrink-0" />
                <span>Unduhan luring saat perjalanan</span>
              </li>
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={Tick01Icon} className="w-4 h-4 text-primary shrink-0" />
                <span>Narasi HD (320 kbps)</span>
              </li>
            </ul>

            <button
              onClick={() => handleSelectPlan("weekly-vacation-pass", "Weekly Vacation Pass")}
              className="w-full py-3 rounded-2xl bg-background border border-border text-xs font-extrabold text-foreground hover:bg-card transition-colors cursor-pointer"
            >
              Pilih Weekly Vacation Pass
            </button>
          </div>

          {/* Tier 3: Monthly Destinasi Pass (best seller) */}
          <div className="p-5 rounded-3xl bg-card border-2 border-primary flex flex-col gap-4 shadow-2xs relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-foreground">Monthly Destinasi Pass</h3>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-black border border-primary/20">
                  Best Seller
                </span>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-primary">Rp 59.000</span>
                <span className="text-[10px] text-muted-foreground font-semibold block">/bulan</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground -mt-2">
              Untuk digital nomad, staycation, &amp; traveler multi-destinasi
            </p>

            <div className="h-px bg-border/60 w-full" />

            <ul className="flex flex-col gap-2.5 text-xs text-foreground font-medium">
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={Tick01Icon} className="w-4 h-4 text-primary shrink-0" />
                <span>Akses Tanpa Batas 500+ Audio Guide</span>
              </li>
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={Download01Icon} className="w-4 h-4 text-primary shrink-0" />
                <span>Mode Unduhan Luring (Offline Audio)</span>
              </li>
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={Tick01Icon} className="w-4 h-4 text-primary shrink-0" />
                <span>Narasi HD Suara Asli Budayawan (320 kbps)</span>
              </li>
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={Tick01Icon} className="w-4 h-4 text-primary shrink-0" />
                <span>Bebas Iklan 100% saat Mendengarkan</span>
              </li>
            </ul>

            <button
              onClick={() => handleSelectPlan("monthly-destinasi-pass", "Monthly Destinasi Pass")}
              className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-extrabold text-xs hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
            >
              {currentPlan === "monthly-destinasi-pass" ? "Paket Saat Ini" : "Langganan Monthly Destinasi Pass"}
            </button>
          </div>

          {/* Tier 4: Annual Explorer Pass */}
          <div className="p-5 rounded-3xl bg-card border border-border flex flex-col gap-4 shadow-2xs">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-black text-foreground">Annual Explorer Pass</h3>
                <p className="text-xs text-muted-foreground">Untuk traveler aktif &amp; pegiat budaya</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-foreground">Rp 199.000</span>
                <span className="text-[10px] text-muted-foreground font-semibold block">/tahun</span>
              </div>
            </div>

            <div className="h-px bg-border/60 w-full" />

            <ul className="flex flex-col gap-2.5 text-xs text-muted-foreground font-medium">
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={Tick01Icon} className="w-4 h-4 text-primary shrink-0" />
                <span>Semua fitur Monthly Destinasi Pass</span>
              </li>
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={Tick01Icon} className="w-4 h-4 text-primary shrink-0" />
                <span>Akses Tiket VIP Event Kebudayaan</span>
              </li>
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={Tick01Icon} className="w-4 h-4 text-primary shrink-0" />
                <span>Multi-Bahasa Narasi (Indo, Eng, Jap, Mand)</span>
              </li>
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={Tick01Icon} className="w-4 h-4 text-primary shrink-0" />
                <span>Badge Spesial Profil &amp; Dukungan Prioritas</span>
              </li>
            </ul>

            <button
              onClick={() => handleSelectPlan("annual-explorer-pass", "Annual Explorer Pass")}
              className="w-full py-3 rounded-2xl bg-background border border-border text-xs font-extrabold text-foreground hover:bg-card transition-colors cursor-pointer"
            >
              Pilih Annual Explorer Pass
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedPlanModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border p-5 rounded-3xl max-w-xs w-full flex flex-col gap-4 text-center shadow-2xl animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto">
              <HugeiconsIcon icon={Ticket01Icon} className="w-6 h-6" />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-black text-foreground">
                Konfirmasi Langganan
              </h3>
              <p className="text-xs text-muted-foreground">
                Apakah kamu yakin ingin mengaktifkan paket <strong>{selectedPlanModal}</strong>?
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setSelectedPlanModal(null)}
                className="flex-1 py-2.5 rounded-xl border border-border text-xs font-extrabold text-foreground hover:bg-background transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleConfirmUpgrade(selectedPlanModal)}
                className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-extrabold hover:opacity-90 transition-opacity cursor-pointer"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
