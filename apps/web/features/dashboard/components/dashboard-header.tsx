"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Notification01Icon,
  Search01Icon,
  FilterIcon,
} from "@hugeicons/core-free-icons"

export interface UserProfile {
  name: string
  greeting: string
  avatarUrl?: string
  initials: string
}

interface DashboardHeaderProps {
  user?: UserProfile
  onSearchChange?: (query: string) => void
}

export function DashboardHeader({
  user = {
    name: "Aswin",
    greeting: "Selamat Datang,",
    initials: "A",
  },
  onSearchChange,
}: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    onSearchChange?.(e.target.value)
  }

  return (
    <header className="flex flex-col gap-4 p-4 sm:p-5 bg-card sticky top-0 z-30 shadow-xs">
      {/* Top Bar: User Profile & Notification */}
      <div className="flex items-center justify-between w-full">
        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-extrabold text-base border-2 border-background shadow-xs shrink-0">
            {user.initials}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-card" />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-semibold text-muted-foreground leading-tight">
              {user.greeting}
            </span>
            <span className="text-base font-black text-foreground tracking-tight truncate">
              {user.name} 👋
            </span>
          </div>
        </div>

        {/* Notification Button */}
        <button
          aria-label="Notifikasi"
          className="relative w-10 h-10 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors duration-200 flex items-center justify-center text-foreground border border-border shadow-xs cursor-pointer"
        >
          <HugeiconsIcon icon={Notification01Icon} className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full ring-2 ring-card" />
        </button>
      </div>

      {/* Search Input Bar with Filter Button */}
      <div className="flex items-center gap-2 w-full">
        <div className="relative flex-1 flex items-center">
          <HugeiconsIcon
            icon={Search01Icon}
            className="absolute left-3.5 w-4 h-4 text-muted-foreground pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Cari situs candi, tari, atau cerita rakyat..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-card transition-all text-foreground placeholder:text-muted-foreground font-medium"
          />
        </div>

        <button
          aria-label="Filter Pencarian"
          className="w-10 h-10 rounded-2xl bg-background hover:bg-primary hover:text-primary-foreground transition-colors duration-200 flex items-center justify-center text-foreground border border-border shrink-0 cursor-pointer"
        >
          <HugeiconsIcon icon={FilterIcon} className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
