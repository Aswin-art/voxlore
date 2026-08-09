"use client"

import { Suspense } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryState, parseAsString } from "nuqs"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Location01Icon,
  Calendar01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons"
import { TravelPlanSchema } from "@/features/events/data/travel-plan-schema"
import { z } from "zod"
import { RecentPlansSection } from "@/features/dashboard/components/recent-plans-section"
import { SearchableSelect } from "@/features/shared/components/searchable-select"
import { useProvinces } from "@/features/shared/hooks/use-provinces"
import ErrorBoundary from "@/components/error-boundary"
import { Skeleton } from "@workspace/ui/components/skeleton"

export default function EventsPage() {
  return (
    <div className="p-4 sm:p-5 flex flex-col gap-5 pb-28 relative">
      <Suspense fallback={<EventsPageSkeleton />}>
        <ErrorBoundary label="Form Rencana Liburan">
          <EventsPageContent />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}

function EventsPageContent() {
  const router = useRouter()

  const [vacationStart, setVacationStart] = useQueryState("start", parseAsString.withDefault(""))
  const [vacationEnd, setVacationEnd] = useQueryState("end", parseAsString.withDefault(""))
  const [selectedProvince, setSelectedProvince] = useQueryState("province", parseAsString.withDefault("Semua"))

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.input<typeof TravelPlanSchema>, unknown, z.output<typeof TravelPlanSchema>>({
    resolver: zodResolver(TravelPlanSchema),
    defaultValues: {
      start: vacationStart,
      end: vacationEnd,
      province: selectedProvince,
    },
  })

  const provincesQuery = useProvinces()

  const provinceOptions = provincesQuery.data
    ? ["Semua", ...provincesQuery.data.map((p) => p.name)]
    : ["Semua"]

  const handleSubmitPlan = handleSubmit((values) => {
    const province = values.province || selectedProvince || "Semua"
    router.push(
      `/events/plan?start=${encodeURIComponent(values.start)}&end=${encodeURIComponent(values.end)}&province=${encodeURIComponent(province)}`
    )
  })

  const handleReset = () => {
    setVacationStart(null)
    setVacationEnd(null)
    setSelectedProvince(null)
    reset({ start: "", end: "", province: "Semua" })
  }

  const hasActiveFilters = vacationStart || vacationEnd || selectedProvince !== "Semua"

  return (
    <div className="flex flex-col gap-5">
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
        noValidate
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

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
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
              {...register("start")}
              className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {errors.start?.message && (
              <span className="text-[10px] font-bold text-red-500">
                {errors.start.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider">
              Selesai Liburan
            </label>
            <input
              type="date"
              {...register("end")}
              className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {errors.end?.message && (
              <span className="text-[10px] font-bold text-red-500">
                {errors.end.message}
              </span>
            )}
          </div>
        </div>

        {/* Province Select Dropdown */}
        {provincesQuery.isLoading ? (
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <HugeiconsIcon icon={Location01Icon} className="w-3.5 h-3.5 text-primary" />
              <span>Provinsi / Wilayah Tujuan</span>
            </label>
            <Skeleton className="h-10 w-full rounded-2xl" />
          </div>
        ) : (
          <SearchableSelect
            label="Provinsi / Wilayah Tujuan"
            icon={Location01Icon}
            options={provinceOptions}
            value={selectedProvince}
            onChange={(val) => setSelectedProvince(val || "Semua")}
            placeholder="Semua Provinsi"
            searchPlaceholder="Cari provinsi tujuan..."
          />
        )}

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

function EventsPageSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-6 w-40 rounded-xl" />
        <Skeleton className="h-3 w-64 rounded" />
      </div>

      <div className="p-5 rounded-3xl bg-card border border-border shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <Skeleton className="h-4 w-44 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
        <Skeleton className="h-10 w-full rounded-2xl" />
        <Skeleton className="h-11 w-full rounded-2xl" />
      </div>

      <Skeleton className="h-40 w-full rounded-3xl" />
    </div>
  )
}