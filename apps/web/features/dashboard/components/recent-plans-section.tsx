"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Calendar01Icon,
  Bookmark01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons"
import {
  INITIAL_RECENT_PLANS,
  RecentPlanItem,
  FestivalEvent,
} from "@/app/(user)/events/data"

export type { FestivalEvent, RecentPlanItem }

interface RecentPlansSectionProps {
  className?: string
}

export function RecentPlansSection({ className = "" }: RecentPlansSectionProps) {
  const router = useRouter()
  const [recentPlans, setRecentPlans] = useState<RecentPlanItem[]>(INITIAL_RECENT_PLANS)
  const [selectedPlanDetail, setSelectedPlanDetail] = useState<RecentPlanItem | null>(null)

  // Load stored plans from localStorage if available
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

  return (
    <div id="cultural-events-section" className={`flex flex-col gap-3.5 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={Bookmark01Icon} className="w-4 h-4 text-amber-500" />
          <h2 className="text-xs font-extrabold text-foreground uppercase tracking-wider">
            Recent Plan ({recentPlans.length})
          </h2>
        </div>
        <span className="text-[10px] text-muted-foreground font-semibold">Tersimpan</span>
      </div>

      {/* Recent Plans Cards List */}
      {recentPlans.length === 0 ? (
        <div className="p-8 text-center bg-card rounded-3xl border border-border flex flex-col items-center justify-center gap-2">
          <HugeiconsIcon icon={Calendar01Icon} className="w-8 h-8 text-muted-foreground/40" />
          <span className="text-xs font-extrabold text-foreground">Belum ada Recent Plan</span>
          <span className="text-[11px] text-muted-foreground">
            Buat rencana perjalanan festival budaya pertama kamu.
          </span>
          <button
            onClick={() => router.push("/events/plan")}
            className="mt-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-extrabold cursor-pointer"
          >
            Buat Travel Plan Baru
          </button>
        </div>
      ) : (
        recentPlans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlanDetail(plan)}
            className="p-4 rounded-3xl bg-card border border-border flex flex-col gap-3 shadow-2xs hover:shadow-sm transition-all cursor-pointer group"
          >
            {/* Top Row: Province Badge, Creation Date & Event Count Pill */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-extrabold text-amber-500 uppercase tracking-wider">
                    {plan.province}
                  </span>
                  <span className="text-[9px] text-muted-foreground">• {plan.createdDate}</span>
                </div>

                {/* Prominent Date Range Display */}
                <div className="flex items-center gap-2 text-sm sm:text-base font-black text-foreground group-hover:text-primary transition-colors">
                  <HugeiconsIcon icon={Calendar01Icon} className="w-4 h-4 text-primary shrink-0" />
                  <span>{plan.dateRangeStr}</span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold shrink-0 border border-primary/20">
                {plan.eventsCount} Festival
              </span>
            </div>

            {/* Event Snippets preview inside Recent Plan */}
            {plan.events.length > 0 && (
              <div className="p-2.5 rounded-2xl bg-background/60 border border-border/60 flex flex-col gap-1.5">
                <span className="text-[10px] font-extrabold text-muted-foreground uppercase">
                  Jadwal Festival Berlangsung:
                </span>
                {plan.events.map((evt) => (
                  <div key={evt.id} className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground truncate">{evt.title}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{evt.date}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Recent Plan Card Footer */}
            <div className="pt-2 border-t border-border/60 flex items-center justify-end text-[11px]">
              <span className="text-primary font-extrabold group-hover:underline flex items-center gap-1">
                <span>Detail Plan</span>
                <HugeiconsIcon icon={ArrowRight01Icon} className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))
      )}

      {/* Plan Detail Drawer Modal */}
      {selectedPlanDetail && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 animate-in fade-in duration-200"
            onClick={() => setSelectedPlanDetail(null)}
          />
          <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-card border-t border-border rounded-t-3xl p-5 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold text-amber-500 uppercase tracking-wider">
                  {selectedPlanDetail.province}
                </span>
                <span className="text-sm font-black text-foreground">
                  {selectedPlanDetail.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPlanDetail(null)}
                className="w-8 h-8 rounded-full bg-background border border-border text-muted-foreground hover:text-foreground flex items-center justify-center cursor-pointer transition-colors"
              >
                <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
                <HugeiconsIcon icon={Calendar01Icon} className="w-4 h-4 shrink-0" />
                <span>Tanggal Kunjungan: {selectedPlanDetail.dateRangeStr}</span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-extrabold text-foreground uppercase tracking-wider">
                  Daftar Festival Pas Liburan:
                </span>
                {selectedPlanDetail.events.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-3 rounded-2xl bg-background border border-border flex flex-col gap-1 shadow-2xs"
                  >
                    <span className="text-xs font-extrabold text-foreground truncate">{evt.title}</span>
                    <span className="text-[10px] text-muted-foreground">{evt.location} • {evt.date}</span>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Backwards compatibility alias
export { RecentPlansSection as CulturalEventsSection }
