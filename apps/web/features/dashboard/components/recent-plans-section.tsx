"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { Calendar01Icon, Bookmark01Icon, Cancel01Icon } from "@hugeicons/core-free-icons"
import { apiRequest } from "@/features/auth/data/api-client"
import type { CulturalFestival } from "@/lib/data"

export interface RecentPlanItem {
  id: string
  title: string
  province: string
  dateRangeStr: string
  eventsCount: number
  createdDate: string
  events: CulturalFestival[]
}

interface RecentPlansSectionProps { className?: string }

type ApiPlan = {
  id: string
  title: string
  province: string
  dateRange: string
  createdAt: string
  items: Array<{ festival: CulturalFestival }>
}

export function RecentPlansSection({ className = "" }: RecentPlansSectionProps) {
  const router = useRouter()
  const [recentPlans, setRecentPlans] = useState<RecentPlanItem[]>([])
  const [selectedPlanDetail, setSelectedPlanDetail] = useState<RecentPlanItem | null>(null)

  useEffect(() => {
    void apiRequest<ApiPlan[]>("/travel-plans")
      .then((plans) => setRecentPlans(plans.map((plan) => ({
        id: plan.id,
        title: plan.title,
        province: plan.province,
        dateRangeStr: plan.dateRange,
        eventsCount: plan.items.length,
        createdDate: new Date(plan.createdAt).toLocaleDateString("id-ID"),
        events: plan.items.map((item) => item.festival),
      }))))
      .catch(() => setRecentPlans([]))
  }, [])

  return (
    <div id="cultural-events-section" className={`flex flex-col gap-3.5 ${className}`}>
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={Bookmark01Icon} className="w-4 h-4 text-amber-500" />
          <h2 className="text-xs font-extrabold text-foreground uppercase tracking-wider">Recent Plan ({recentPlans.length})</h2>
        </div>
        <span className="text-[10px] text-muted-foreground font-semibold">Tersimpan</span>
      </div>
      {recentPlans.length === 0 ? (
        <div className="p-8 text-center bg-card rounded-3xl border border-border flex flex-col items-center justify-center gap-2">
          <HugeiconsIcon icon={Calendar01Icon} className="w-8 h-8 text-muted-foreground/40" />
          <span className="text-xs font-extrabold text-foreground">Belum ada Recent Plan</span>
          <button onClick={() => router.push("/events/plan")} className="mt-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-extrabold cursor-pointer">Buat Travel Plan Baru</button>
        </div>
      ) : recentPlans.map((plan) => (
        <button key={plan.id} onClick={() => setSelectedPlanDetail(plan)} className="text-left p-4 rounded-3xl bg-card border border-border flex flex-col gap-3 shadow-2xs hover:shadow-sm transition-all cursor-pointer group">
          <span className="text-sm font-extrabold text-foreground">{plan.title}</span>
          <span className="text-xs text-muted-foreground">{plan.province} · {plan.dateRangeStr} · {plan.eventsCount} event</span>
        </button>
      ))}
      {selectedPlanDetail && (
        <div className="fixed inset-0 z-50 bg-black/40 p-4 flex items-center justify-center" onClick={() => setSelectedPlanDetail(null)}>
          <div className="bg-card rounded-3xl p-5 max-w-md w-full" onClick={(event) => event.stopPropagation()}>
            <button className="float-right" onClick={() => setSelectedPlanDetail(null)} aria-label="Tutup"><HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5" /></button>
            <h3 className="font-black text-lg">{selectedPlanDetail.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{selectedPlanDetail.eventsCount} event · {selectedPlanDetail.dateRangeStr}</p>
          </div>
        </div>
      )}
    </div>
  )
}
