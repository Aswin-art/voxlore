"use client"

import { Suspense, useEffect, useState } from "react"
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
import { apiRequest } from "@/features/auth/data/api-client"

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

export interface ApiMySubscription {
  userId: string
  activePackage: ApiSubscriptionPackage
  status: string
  activatedAt: string
  expiresAt: string | null
}

export function PackagesPageSkeleton() {
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

export function PackagesPage() {
  return (
    <Suspense fallback={<PackagesPageSkeleton />}>
      <ErrorBoundary label="Paket Berlangganan">
        <PackagesPageContent />
      </ErrorBoundary>
    </Suspense>
  )
}

export function PackagesPageContent() {
  const router = useRouter()
  const [packages, setPackages] = useState<ApiSubscriptionPackage[]>([])
  const [mySub, setMySub] = useState<ApiMySubscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [toast, setToast] = useState<string | null>(null)
  const [selectedPlanModal, setSelectedPlanModal] = useState<ApiSubscriptionPackage | null>(null)

  const fetchData = () => {
    setIsLoading(true)
    Promise.all([
      apiRequest<ApiSubscriptionPackage[]>("/packages"),
      apiRequest<ApiMySubscription>("/packages/my-subscription").catch(() => null),
    ])
      .then(([pkgs, sub]) => {
        if (Array.isArray(pkgs)) setPackages(pkgs)
        if (sub) setMySub(sub)
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const currentPlanId = mySub?.activePackage?.id || "free"

  const handleSelectPlan = (pkg: ApiSubscriptionPackage) => {
    if (pkg.id === currentPlanId) {
      setToast(`Kamu saat ini sedang aktif di paket ${pkg.name} 👍`)
      setTimeout(() => setToast(null), 3000)
      return
    }
    setSelectedPlanModal(pkg)
  }

  const handleConfirmUpgrade = async (pkg: ApiSubscriptionPackage) => {
    try {
      const res = await apiRequest<{ success: boolean; message: string }>("/packages/subscribe", {
        method: "POST",
        body: JSON.stringify({ planId: pkg.id }),
      })
      setSelectedPlanModal(null)
      setToast(res.message || `Selamat! Berhasil beralih ke paket ${pkg.name} 🎉`)
      setTimeout(() => setToast(null), 3500)
      fetchData()
    } catch {
      setToast("Gagal memproses langganan paket. Silakan coba lagi.")
      setTimeout(() => setToast(null), 3500)
    }
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
            Paket Berlangganan
          </h1>
          <span className="text-xs text-muted-foreground truncate">
            Buka akses tak terbatas kisah audio guide Nusantara
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="p-4 sm:p-5 flex flex-col gap-5 w-full">
        {isLoading ? (
          <div className="flex flex-col gap-4 w-full">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-44 w-full rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            {packages.map((pkg) => {
              const isCurrent = pkg.id === currentPlanId
              const isBestSeller = pkg.bestSeller

              return (
                <div
                  key={pkg.id}
                  className={`p-5 rounded-3xl bg-card flex flex-col gap-4 shadow-2xs ${
                    isBestSeller ? "border-2 border-primary relative" : "border border-border"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-black text-foreground">
                          {pkg.name}
                        </h3>
                        {isBestSeller && (
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-black border border-primary/20">
                            Best Seller
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{pkg.subtitle}</p>
                    </div>

                    <div className="text-right shrink-0 ml-2">
                      <span className={`text-lg sm:text-xl font-black ${isBestSeller ? "text-primary" : "text-foreground"}`}>
                        {pkg.price}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-semibold block">
                        /{pkg.period}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-border/60 w-full" />

                  <ul className="flex flex-col gap-2.5 text-xs text-muted-foreground font-medium">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <HugeiconsIcon icon={Tick01Icon} className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-foreground">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelectPlan(pkg)}
                    className={`w-full py-3 rounded-2xl text-xs font-extrabold transition-colors cursor-pointer ${
                      isCurrent
                        ? "bg-primary text-primary-foreground shadow-xs cursor-default"
                        : isBestSeller
                          ? "bg-primary text-primary-foreground hover:opacity-90 shadow-sm"
                          : "bg-background border border-border text-foreground hover:bg-card"
                    }`}
                  >
                    {isCurrent ? "Paket Saat Ini" : `Pilih ${pkg.name}`}
                  </button>
                </div>
              )
            })}
          </div>
        )}
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
                Apakah kamu yakin ingin mengaktifkan paket <strong>{selectedPlanModal.name}</strong>?
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
