"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Calendar01Icon,
  Location01Icon,
  Delete01Icon,
  MapsLocation01Icon,
  Clock01Icon,
  ArrowRight01Icon,
  Ticket01Icon,
} from "@hugeicons/core-free-icons"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@workspace/ui/components/drawer"
import { useDeleteTravelPlan } from "@/features/events/hooks/use-travel-plans"
import type { RecentPlanItem } from "@/features/events/data/travel-plans-api"

interface RecentPlanDrawerProps {
  plan: RecentPlanItem | null
  onClose: () => void
  onPlanDeleted?: (planId: string) => void
}

export function RecentPlanDrawer({
  plan,
  onClose,
  onPlanDeleted,
}: RecentPlanDrawerProps) {
  const router = useRouter()
  const deletePlanMutation = useDeleteTravelPlan()

  if (!plan) return null

  const handleDelete = () => {
    if (!confirm(`Apakah Anda yakin ingin menghapus rencana "${plan.title}"?`)) {
      return
    }

    deletePlanMutation.mutate(plan.id, {
      onSuccess: () => {
        onPlanDeleted?.(plan.id)
        onClose()
      },
      onError: () => {
        alert("Gagal menghapus rencana travel.")
      },
    })
  }

  const isDeleting = deletePlanMutation.isPending

  return (
    <Drawer open={Boolean(plan)} onOpenChange={(open) => !open && onClose()} showSwipeHandle={true}>
      <DrawerContent className="max-h-[85vh] h-auto w-full sm:max-w-md mx-auto rounded-t-3xl border-t sm:border-x border-border bg-card p-0 flex flex-col justify-between shadow-2xl">
        {/* Drawer Header */}
        <DrawerHeader className="p-4 sm:p-5 pb-3 border-b border-border/60 text-left">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-extrabold uppercase tracking-wider">
                  Rencana Budaya
                </span>
                <span className="text-[10px] text-muted-foreground font-semibold">
                  Dibuat {plan.createdDate}
                </span>
              </div>

              <DrawerTitle className="text-lg font-black text-foreground tracking-tight line-clamp-1 mt-0.5">
                {plan.title}
              </DrawerTitle>
            </div>
          </div>

          <DrawerDescription className="text-xs text-muted-foreground flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="flex items-center gap-1 font-medium text-foreground">
              <HugeiconsIcon icon={MapsLocation01Icon} className="w-3.5 h-3.5 text-destructive shrink-0" />
              {plan.province}
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1 font-medium text-foreground">
              <HugeiconsIcon icon={Calendar01Icon} className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              {plan.dateRangeStr}
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1 font-medium text-foreground">
              <HugeiconsIcon icon={Ticket01Icon} className="w-3.5 h-3.5 text-primary shrink-0" />
              {plan.eventsCount} Event
            </span>
          </DrawerDescription>
        </DrawerHeader>

        {/* Scrollable Events List Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
              Daftar Event ({plan.events.length})
            </h4>
          </div>

          {plan.events.length === 0 ? (
            <div className="p-8 text-center bg-background rounded-3xl border border-border flex flex-col items-center gap-2">
              <HugeiconsIcon icon={Calendar01Icon} className="w-9 h-9 text-muted-foreground/30" />
              <span className="text-xs font-extrabold text-foreground">Belum ada event ditambahkan</span>
              <span className="text-[11px] text-muted-foreground">
                Buka event planner untuk mencari dan menambahkan festival budaya ke rencana ini.
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {plan.events.map((event) => (
                <div
                  key={event.id || event.title}
                  className="bg-background rounded-3xl border border-border p-3 flex items-center gap-3 hover:border-primary/40 transition-colors shadow-2xs group"
                >
                  {/* Event Thumbnail */}
                  {event.image ? (
                    <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden shrink-0 border border-border/50">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="88px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {event.type && (
                        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[8px] font-black uppercase">
                          {event.type}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <HugeiconsIcon icon={Calendar01Icon} className="w-6 h-6" />
                    </div>
                  )}

                  {/* Event Info */}
                  <div className="flex flex-col justify-between flex-1 min-w-0 h-full py-0.5 gap-1">
                    <div>
                      <h5 className="text-xs sm:text-sm font-extrabold text-foreground line-clamp-1">
                        {event.title}
                      </h5>
                      {event.description && (
                        <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
                          {event.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5 text-[10px] text-muted-foreground font-medium pt-1 border-t border-border/40">
                      {event.location && (
                        <span className="flex items-center gap-1 truncate">
                          <HugeiconsIcon icon={Location01Icon} className="w-3 h-3 text-destructive shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </span>
                      )}
                      {event.date && (
                        <span className="flex items-center gap-1 shrink-0">
                          <HugeiconsIcon icon={Clock01Icon} className="w-3 h-3 text-amber-500 shrink-0" />
                          <span>{event.date}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <DrawerFooter className="p-4 sm:p-5 pt-3 border-t border-border/60 flex flex-row items-center gap-2">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3.5 py-3 rounded-2xl border border-destructive/30 text-destructive hover:bg-destructive/10 text-xs font-extrabold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50"
          >
            <HugeiconsIcon icon={Delete01Icon} className="w-4 h-4" />
            <span className="hidden xs:inline sm:inline">{isDeleting ? "Hapus..." : "Hapus Rencana"}</span>
            <span className="inline xs:hidden sm:hidden">{isDeleting ? "Hapus..." : "Hapus"}</span>
          </button>

          <button
            onClick={() => {
              onClose()
              router.push("/events/plan")
            }}
            className="flex-1 py-3 px-4 rounded-2xl bg-primary text-primary-foreground text-xs font-extrabold hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Buka di Event Planner</span>
            <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4 shrink-0" />
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
