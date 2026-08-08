"use client"

import { useState, useMemo, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  Search01Icon,
  Location01Icon,
  Calendar01Icon,
  CheckIcon,
  Add01Icon,
  Bookmark01Icon,
  PencilEdit01Icon,
  PlayCircleIcon,
} from "@hugeicons/core-free-icons"
import { EVENTS_CATALOG, FestivalEvent, RecentPlanItem, PROVINCES } from "../data"
import { SearchableSelect } from "@/features/shared/components/searchable-select"


function SelectFestivalPlanContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialStart = searchParams.get("start") || ""
  const initialEnd = searchParams.get("end") || ""
  const initialProvince = searchParams.get("province") || "Semua"

  const [vacationStart, setVacationStart] = useState(initialStart)
  const [vacationEnd, setVacationEnd] = useState(initialEnd)
  const [selectedProvince, setSelectedProvince] = useState(initialProvince)
  const [isEditingFilter, setIsEditingFilter] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFestivalIds, setSelectedFestivalIds] = useState<Record<string, boolean>>({})
  const [selectedTrailerEvent, setSelectedTrailerEvent] = useState<FestivalEvent | null>(null)

  // Filter festivals based on province, date overlap, and name search
  const filteredEvents = useMemo(() => {
    return EVENTS_CATALOG.filter((evt) => {
      const matchesSearch =
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesProvince =
        selectedProvince === "Semua" || evt.province === selectedProvince

      let matchesDate = true
      if (vacationStart && vacationEnd) {
        matchesDate = evt.startDateStr <= vacationEnd && evt.endDateStr >= vacationStart
      } else if (vacationStart) {
        matchesDate = evt.endDateStr >= vacationStart
      }

      return matchesSearch && matchesProvince && matchesDate
    })
  }, [searchQuery, selectedProvince, vacationStart, vacationEnd])

  // Silent toggle selection without triggering toast notification
  const toggleSelectFestival = (id: string) => {
    setSelectedFestivalIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const selectedEvents = EVENTS_CATALOG.filter((e) => selectedFestivalIds[e.id])

  const handleSavePlan = () => {
    const provinceName = selectedProvince !== "Semua" ? selectedProvince : "Seluruh Indonesia"
    const dateStr = vacationStart && vacationEnd ? `${vacationStart} s/d ${vacationEnd}` : "Tanggal Terjadwal"
    const fallbackEvent = filteredEvents[0]

    const newPlan: RecentPlanItem = {
      id: `plan-${Date.now()}`,
      title: `Liburan Budaya ${provinceName}`,
      province: provinceName,
      dateRangeStr: dateStr,
      eventsCount: selectedEvents.length,
      createdDate: "Baru saja",
      events: selectedEvents.length > 0 ? selectedEvents : (fallbackEvent ? [fallbackEvent] : []),
    }

    try {
      const existingStr = localStorage.getItem("voxlore_recent_plans")
      const existingPlans = existingStr ? JSON.parse(existingStr) : []
      localStorage.setItem("voxlore_recent_plans", JSON.stringify([newPlan, ...existingPlans]))
    } catch (err) {
      console.error("Failed saving recent plan:", err)
    }

    router.push("/events")
  }

  return (
    <div className="p-4 sm:p-5 flex flex-col gap-5 pb-32 relative">
      {/* Navigation Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-2xl border border-border bg-card flex items-center justify-center text-foreground hover:bg-background transition-colors cursor-pointer shrink-0"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
        </button>
        <div className="flex flex-col min-w-0">
          <h1 className="text-lg font-extrabold text-foreground tracking-tight truncate">
            Pilih Festival Liburan
          </h1>
          <span className="text-xs text-muted-foreground truncate">
            Pilih perayaan budaya yang ingin Anda kunjungi
          </span>
        </div>
      </div>

      {/* ELEGANT, SPACIOUS Criteria Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border shadow-xs flex flex-col gap-4 transition-all">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-black uppercase tracking-wider text-foreground">
              Kriteria Liburan Anda
            </span>
            <span className="text-[11px] text-muted-foreground font-medium">
              Filter jadwal festival berdasarkan tanggal &amp; destinasi
            </span>
          </div>

          {/* Meaningful Edit Toggle button: PencilEdit01Icon */}
          <button
            type="button"
            onClick={() => setIsEditingFilter(!isEditingFilter)}
            className={`w-8.5 h-8.5 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              isEditingFilter
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary border-border text-foreground hover:bg-muted"
            }`}
            title="Ubah Input Kriteria"
          >
            <HugeiconsIcon icon={PencilEdit01Icon} className="w-4 h-4" />
          </button>
        </div>

        {/* Display Current Criteria Cards when not editing */}
        {!isEditingFilter ? (
          <div className="flex flex-col gap-3 pt-1">
            {/* Row 1: 2 Date Cards with s/d in between */}
            <div className="flex items-center gap-2">
              <div className="flex-1 p-3 rounded-2xl bg-secondary/60 border border-border/80 flex flex-col gap-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                  Mulai
                </span>
                <div className="flex items-center gap-1.5 text-xs font-black text-foreground truncate">
                  <HugeiconsIcon icon={Calendar01Icon} className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="truncate">{vacationStart || "-"}</span>
                </div>
              </div>

              <span className="text-xs font-black text-muted-foreground uppercase shrink-0 px-0.5">
                s/d
              </span>

              <div className="flex-1 p-3 rounded-2xl bg-secondary/60 border border-border/80 flex flex-col gap-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                  Selesai
                </span>
                <div className="flex items-center gap-1.5 text-xs font-black text-foreground truncate">
                  <HugeiconsIcon icon={Calendar01Icon} className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="truncate">{vacationEnd || "-"}</span>
                </div>
              </div>
            </div>

            {/* Row 2: Province Card Below */}
            <div className="p-3.5 rounded-2xl bg-secondary/60 border border-border/80 flex flex-col gap-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                Provinsi / Wilayah Tujuan
              </span>
              <div className="flex items-center gap-2 text-xs font-black text-foreground">
                <HugeiconsIcon icon={Location01Icon} className="w-4 h-4 text-destructive shrink-0" />
                <span>{selectedProvince}</span>
              </div>
            </div>
          </div>
        ) : (
          /* Inline Filter Editing Controls */
          <div className="flex flex-col gap-4 pt-3 border-t border-border/60 animate-in fade-in duration-200">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider">
                  Mulai
                </label>
                <input
                  type="date"
                  value={vacationStart}
                  onChange={(e) => setVacationStart(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider">
                  Selesai
                </label>
                <input
                  type="date"
                  value={vacationEnd}
                  onChange={(e) => setVacationEnd(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <SearchableSelect
              label="Provinsi Tujuan"
              icon={Location01Icon}
              options={PROVINCES}
              value={selectedProvince}
              onChange={(val) => setSelectedProvince(val || "Semua")}
              placeholder="Semua Provinsi"
              searchPlaceholder="Cari provinsi..."
            />
          </div>
        )}
      </div>

      {/* Search Bar for Festival Name */}
      <div className="relative flex items-center w-full">
        <HugeiconsIcon
          icon={Search01Icon}
          className="absolute left-3.5 w-4 h-4 text-muted-foreground pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari nama festival, tari, atau lokasi..."
          className="w-full pl-10 pr-8 py-2.5 text-xs sm:text-sm bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-card transition-all text-foreground placeholder:text-muted-foreground font-medium"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 text-xs text-muted-foreground hover:text-foreground p-1 cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      {/* Festival List */}
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between px-0.5">
          <span className="text-xs font-extrabold text-foreground uppercase tracking-wider">
            Festival Berlangsung ({filteredEvents.length})
          </span>
          <span className="text-[11px] text-muted-foreground font-semibold">
            {selectedEvents.length} Terpilih
          </span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center bg-card rounded-3xl border border-border flex flex-col items-center justify-center gap-2">
            <HugeiconsIcon icon={Search01Icon} className="w-8 h-8 text-muted-foreground/40" />
            <span className="text-xs font-extrabold text-foreground">Tidak ada festival ditemukan</span>
            <span className="text-[11px] text-muted-foreground">
              Tidak ada perayaan budaya pada rentang tanggal &amp; lokasi ini. Coba sesuaikan kata kunci pencarian.
            </span>
          </div>
        ) : (
          filteredEvents.map((evt) => {
            const isSelected = !!selectedFestivalIds[evt.id]

            return (
              <div
                key={evt.id}
                onClick={() => toggleSelectFestival(evt.id)}
                className={`p-4 rounded-3xl border transition-all cursor-pointer flex flex-col gap-3 ${
                  isSelected
                    ? "bg-secondary border-primary/40 shadow-xs"
                    : "bg-card border-border hover:border-border/80"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Date Badge */}
                    <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex flex-col items-center justify-center shrink-0 shadow-xs border border-primary/30">
                      <span className="text-[9px] font-extrabold uppercase opacity-80 tracking-widest">
                        {evt.monthBadge}
                      </span>
                      <span className="text-lg font-black leading-none">{evt.dayBadge}</span>
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider">
                        {evt.category}
                      </span>
                      <h2 className="text-sm font-extrabold text-foreground truncate">
                        {evt.title}
                      </h2>
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                        <HugeiconsIcon icon={Location01Icon} className="w-3 h-3 text-destructive shrink-0" />
                        <span className="truncate">
                          {evt.location}, {evt.province}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Select Toggle Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSelectFestival(evt.id)
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-background border border-border text-foreground hover:bg-card"
                    }`}
                  >
                    <HugeiconsIcon icon={isSelected ? CheckIcon : Add01Icon} className="w-3.5 h-3.5" />
                    <span>{isSelected ? "Terpilih" : "+ Pilih"}</span>
                  </button>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 pl-0.5">
                  {evt.description}
                </p>

                <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-foreground">{evt.date}</span>
                  
                  {/* Play Trailer Action Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedTrailerEvent(evt)
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-foreground text-background hover:bg-foreground/90 font-extrabold transition-all cursor-pointer shadow-xs active:scale-95"
                    title="Tonton Trailer"
                  >
                    <HugeiconsIcon icon={PlayCircleIcon} className="w-3.5 h-3.5" />
                    <span>Play Trailer</span>
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Video Trailer Modal Dialog */}
      {selectedTrailerEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedTrailerEvent(null)}
        >
          <div
            className="bg-card border border-border rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header: Judul & Close Button */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-card">
              <h3 className="text-sm font-extrabold text-foreground truncate pr-2">
                {selectedTrailerEvent.title}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedTrailerEvent(null)}
                className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors cursor-pointer shrink-0 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src="https://www.youtube-nocookie.com/embed/5qap5aO4i9A?autoplay=1&rel=0"
                title={selectedTrailerEvent.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Sticky Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto px-0 z-40">
        <button
          onClick={handleSavePlan}
          className="w-full py-4 sm:py-4.5 px-5 rounded-t-3xl bg-primary text-primary-foreground text-sm font-black flex items-center justify-between shadow-2xl hover:bg-primary/95 transition-all cursor-pointer border-t border-x border-primary-foreground/20 active:opacity-95"
        >
          <div className="flex items-center gap-2.5">
            <HugeiconsIcon icon={Bookmark01Icon} className="w-5 h-5" />
            <span>Simpan Rencana Liburan</span>
          </div>
          <span className="bg-primary-foreground/20 text-primary-foreground px-3 py-1.5 rounded-xl text-xs font-black shrink-0">
            {selectedEvents.length} Dipilih →
          </span>
        </button>
      </div>
    </div>
  )
}

export default function SelectFestivalPlanPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-muted-foreground font-bold">Memuat rencana liburan...</div>}>
      <SelectFestivalPlanContent />
    </Suspense>
  )
}
