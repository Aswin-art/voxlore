"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { Calendar01Icon, Bookmark01Icon } from "@hugeicons/core-free-icons"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { useTravelPlans } from "@/features/events/hooks/use-travel-plans"
import type { RecentPlanItem } from "@/features/events/data/travel-plans-api"
import { RecentPlanDrawer } from "./recent-plan-drawer"

export type { RecentPlanItem }

interface RecentPlansSectionProps {
  className?: string
}

export function RecentPlansSection({ className = "" }: RecentPlansSectionProps) {
  const router = useRouter()
  const { plans, isPending, isError } = useTravelPlans()
  const [selectedPlanDetail, setSelectedPlanDetail] = useState<RecentPlanItem | null>(null)

  return (
    <div id="cultural-events-section" className={`flex flex-col gap-3.5 ${className}`}>
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={Bookmark01Icon} className="w-4 h-4 text-amber-500" />
          <h2 className="text-xs font-extrabold text-foreground uppercase tracking-wider">
            Recent Plan ({plans.length})
          </h2>
        </div>
        <span className="text-[10px] text-muted-foreground font-semibold">Tersimpan</span>
      </div>

      {isPending ? (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-20 w-full rounded-3xl" />
          <Skeleton className="h-20 w-full rounded-3xl" />
        </div>
      ) : isError || plans.length === 0 ? (
        <div className="p-8 text-center bg-card rounded-3xl border border-border flex flex-col items-center justify-center gap-2 shadow-2xs">
          <HugeiconsIcon icon={Calendar01Icon} className="w-8 h-8 text-muted-foreground/40" />
          <span className="text-xs font-extrabold text-foreground">Belum ada Recent Plan</span>
          <button
            onClick={() => router.push("/events/plan")}
            className="mt-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-extrabold transition-opacity hover:opacity-90 cursor-pointer shadow-xs"
          >
            Buat Travel Plan Baru
          </button>
        </div>
      ) : (
        plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelectedPlanDetail(plan)}
            className="text-left p-4 rounded-3xl bg-card border border-border flex flex-col gap-2.5 shadow-2xs hover:shadow-md hover:border-primary/40 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-extrabold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {plan.title}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold shrink-0">
                {plan.eventsCount} Event
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <span>{plan.province}</span>
              <span>•</span>
              <span>{plan.dateRangeStr}</span>
            </div>
          </button>
        ))
      )}

      {/* Drawer component displaying complete plan detail when clicked */}
      <RecentPlanDrawer
        plan={selectedPlanDetail}
        onClose={() => setSelectedPlanDetail(null)}
      />
    </div>
  )
}
