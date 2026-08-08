"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useQueryState, parseAsString } from "nuqs"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Location01Icon,
  Notification01Icon,
  CheckmarkBadge01Icon,
  Search01Icon,
  FilterIcon,
  Cancel01Icon,
  GridIcon,
  Calendar01Icon,
  Bookmark01Icon,
  SparklesIcon,
  Download01Icon,
  Ticket01Icon,
  Add01Icon,
  HeadphonesIcon,
  Clock01Icon,
} from "@hugeicons/core-free-icons"
import {
  CATEGORIES,
  PROVINCES,
  EVENTS_CATALOG,
  INITIAL_RECENT_PLANS,
  FestivalEvent,
  RecentPlanItem,
} from "./data"
import { RecentPlansSection } from "@/features/dashboard/components/recent-plans-section"
import { SearchableSelect } from "@/features/shared/components/searchable-select"

export default function EventsPage() {
  const router = useRouter()
  const [toast, setToast] = useState<string | null>(null)
  const [recentPlans, setRecentPlans] = useState<RecentPlanItem[]>(INITIAL_RECENT_PLANS)
  const [selectedPlanDetail, setSelectedPlanDetail] = useState<RecentPlanItem | null>(null)

  // Load plans saved in localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("voxlore_recent_plans")
      if (stored) {
        const parsed: RecentPlanItem[] = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRecentPlans([
            ...parsed,
            ...INITIAL_RECENT_PLANS.filter((ip) => !parsed.some((p) => p.id === ip.id)),
          ])
        }
      }
    } catch (err) {
      console.error(err)
    }
  }, [])

  // Form State
  const [vacationStart, setVacationStart] = useQueryState("start", parseAsString.withDefault(""))
  const [vacationEnd, setVacationEnd] = useQueryState("end", parseAsString.withDefault(""))
  const [selectedProvince, setSelectedProvince] = useQueryState("province", parseAsString.withDefault("Semua"))

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  // Handle Form Submit to navigate to the festival selection page
  const handleSubmitPlan = (e: React.FormEvent) => {
    e.preventDefault()

    if (!vacationStart || !vacationEnd) {
      showToast("Pilih tanggal mulai & selesai liburan Anda 📅")
      return
    }

    router.push(
      `/events/plan?start=${vacationStart}&end=${vacationEnd}&province=${encodeURIComponent(selectedProvince)}`
    )
  }

  const handleDeletePlan = (id: string, title: string) => {
    setRecentPlans(recentPlans.filter((p) => p.id !== id))
    showToast(`Rencana "${title}" telah dihapus`)
  }

  return (
    <div className="p-4 sm:p-5 flex flex-col gap-5 pb-28 relative">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-4 left-4 right-4 max-w-sm mx-auto z-50 p-3 bg-primary text-primary-foreground text-xs font-bold rounded-2xl flex items-center justify-between shadow-2xl animate-in fade-in slide-in-from-top-2">
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="opacity-70 hover:opacity-100 ml-2 cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={Calendar01Icon} className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-extrabold text-foreground tracking-tight">
            Travel Plan
          </h1>
        </div>
        <p className="text-xs text-muted-foreground">
          Rencanakan liburan &amp; jelajahi perayaan budaya Nusantara
        </p>
      </div>

      {/* MINIMALIST & CLEAN FORM: Rencanakan Liburan Anda */}
      <form
        onSubmit={handleSubmitPlan}
        className="p-5 rounded-3xl bg-card border border-border shadow-xs flex flex-col gap-4"
      >
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={SparklesIcon} className="w-4 h-4 text-amber-500" />
            <h2 className="text-xs font-extrabold text-foreground uppercase tracking-wider">
              Rencanakan Liburan Anda
            </h2>
          </div>

          {(vacationStart || vacationEnd || selectedProvince !== "Semua") && (
            <button
              type="button"
              onClick={() => {
                setVacationStart(null)
                setVacationEnd(null)
                setSelectedProvince(null)
              }}
              className="text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>

        {/* Date Inputs Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider">
              Mulai Liburan
            </label>
            <input
              type="date"
              value={vacationStart}
              onChange={(e) => setVacationStart(e.target.value || null)}
              className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider">
              Selesai Liburan
            </label>
            <input
              type="date"
              value={vacationEnd}
              onChange={(e) => setVacationEnd(e.target.value || null)}
              className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
        </div>

        {/* Province Select Dropdown */}
        <SearchableSelect
          label="Provinsi / Wilayah Tujuan"
          icon={Location01Icon}
          options={PROVINCES}
          value={selectedProvince}
          onChange={(val) => setSelectedProvince(val)}
          placeholder="Semua Provinsi"
          searchPlaceholder="Cari provinsi tujuan..."
        />

        {/* Submit Action Button */}
        <button
          type="submit"
          className="w-full py-3 mt-1 rounded-2xl bg-primary text-primary-foreground text-xs font-black flex items-center justify-center gap-2 shadow-md hover:bg-primary/90 transition-all cursor-pointer"
        >
          <span>Buat Travel Plan →</span>
        </button>
      </form>

      {/* SECTION: Recent Plan (Rencana Liburan Terbaru) */}
      <RecentPlansSection />
    </div>
  )
}

