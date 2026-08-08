"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import {
  Menu01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons"

export interface AdminHeaderProps {
  onToggleMobileSidebar: () => void
  onToggleCollapseDesktop: () => void
  isCollapsed: boolean
}

export function AdminHeader({
  onToggleMobileSidebar,
  onToggleCollapseDesktop,
  isCollapsed,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 min-h-16 bg-vox-cream/90 backdrop-blur-md border-b border-[#1E2229]/10 px-3 sm:px-6 py-2 flex items-center justify-between gap-2 sm:gap-4">
      {/* Left: Mobile Menu Toggle & Breadcrumb / Search */}
      <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
        {/* Mobile sidebar trigger */}
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden shrink-0 rounded-xl border border-[#1E2229]/10 p-2 text-[#1E2229] transition-colors hover:bg-[#1E2229]/5"
          aria-label="Buka menu navigasi"
        >
          <HugeiconsIcon icon={Menu01Icon} className="h-5 w-5" />
        </button>

        {/* Desktop collapse trigger */}
        <button
          onClick={onToggleCollapseDesktop}
          className="hidden shrink-0 rounded-xl border border-[#1E2229]/10 p-2 text-[#1E2229] transition-colors hover:bg-[#1E2229]/5 lg:flex"
          aria-label={isCollapsed ? "Buka sidebar" : "Ciutkan sidebar"}
        >
          <HugeiconsIcon icon={Menu01Icon} className="h-5 w-5" />
        </button>

        {/* Title & Quick Navigation Breadcrumb */}
        <div className="flex min-w-0 max-w-[13rem] flex-col lg:max-w-[15rem] xl:max-w-[18rem]">
          <div className="flex min-w-0 items-center gap-2 text-xs font-semibold text-[#1E2229]/60">
            <span className="hidden shrink-0 xl:inline">Voxlore Portal</span>
            <span className="hidden shrink-0 text-[#1E2229]/30 xl:inline">/</span>
            <span className="truncate font-bold text-[#1E2229]">Admin Management</span>
          </div>
          <h1 className="truncate text-sm font-extrabold tracking-tight text-[#1E2229] sm:text-base">
            Dashboard Kelola Konten
          </h1>
        </div>
      </div>

      {/* Center: Quick Search Bar */}
      <div className="hidden min-w-0 max-w-md flex-1 xl:flex xl:items-center xl:relative">
        <HugeiconsIcon
          icon={Search01Icon}
          className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1E2229]/40"
        />
        <input
          type="text"
          aria-label="Cari destinasi, event, atau ulasan pengguna"
          placeholder="Cari destinasi, event, atau ulasan pengguna..."
          className="h-10 w-full rounded-xl border border-[#1E2229]/10 bg-white/80 pl-10 pr-4 text-xs text-[#1E2229] placeholder:text-[#1E2229]/40 shadow-2xs transition-colors duration-150 focus:border-[#1E2229] focus:outline-none"
        />
      </div>

      <div className="flex min-w-0 shrink-0 items-center">
        <div className="hidden items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-700 2xl:flex">
          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
          <span>Sistem Aktif</span>
        </div>
      </div>
    </header>
  )
}
