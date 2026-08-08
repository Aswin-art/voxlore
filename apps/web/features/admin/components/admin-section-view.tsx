import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"

type AdminSectionRow = {
  label: string
  detail: string
  status?: string
}

export type AdminSectionConfig = {
  title: string
  description: string
  icon: IconSvgElement
  summary: string
  rows: AdminSectionRow[]
}

export function AdminSectionView({ config }: { config: AdminSectionConfig }) {
  return (
    <div className="min-w-0 space-y-6 pb-12">
      <header className="max-w-3xl space-y-2">
        <div className="flex items-center gap-3 text-[#1E2229]">
          <HugeiconsIcon icon={config.icon} className="h-6 w-6" />
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#1E2229]/55">
            Admin Studio
          </p>
        </div>
        <h1 className="text-[clamp(1.6rem,1.2rem+1.3vw,2.5rem)] font-extrabold leading-tight tracking-tight">
          {config.title}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-[#1E2229]/70">
          {config.description}
        </p>
      </header>

      <section className="min-w-0 overflow-hidden rounded-xl border border-[#1E2229]/10 bg-white/90 shadow-2xs">
        <div className="flex flex-col gap-2 border-b border-[#1E2229]/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-sm font-extrabold text-[#1E2229]">Operational queue</h2>
            <p className="mt-1 text-xs text-[#1E2229]/60">{config.summary}</p>
          </div>
          <span className="w-fit rounded-md bg-[#1E2229]/5 px-2.5 py-1 text-xs font-bold text-[#1E2229]/70">
            {config.rows.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[34rem] divide-y divide-[#1E2229]/10">
            {config.rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[minmax(14rem,1fr)_auto] items-center gap-4 px-4 py-4 sm:px-6"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#1E2229]">{row.label}</p>
                  <p className="mt-1 truncate text-xs text-[#1E2229]/60">{row.detail}</p>
                </div>
                {row.status ? (
                  <span className="rounded-md border border-[#1E2229]/15 px-2 py-1 text-[11px] font-bold text-[#1E2229]/70">
                    {row.status}
                  </span>
                ) : (
                  <span aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#1E2229]/10 bg-vox-cream/40 px-4 py-3 text-xs leading-5 text-[#1E2229]/60 sm:px-6">
          Data operational ditampilkan ringkas agar pemeriksaan harian tetap fokus.
        </div>
      </section>
    </div>
  )
}

export type { AdminSectionRow }

// Keep row content intentionally compact until live admin data is connected.
// ponytail: static operational snapshot; connect API rows when admin mutations exist.
