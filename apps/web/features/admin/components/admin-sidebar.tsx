"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DashboardSquare01Icon,
  Cancel01Icon,
  Calendar03Icon,
  Compass01Icon,
  Settings01Icon,
  StarIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"
import { useAdminDestinations, useAdminEvents, useAdminReviews } from "../hooks/use-admin"

export interface AdminSidebarProps {
  isMobileOpen: boolean
  isCollapsed: boolean
  onCloseMobile: () => void
}

export const ADMIN_NAV_ITEMS = [
  { label: "Dashboard Overview", href: "/dashboard", icon: DashboardSquare01Icon },
  { label: "Destinations", href: "/dashboard/destinations", icon: Compass01Icon },
  { label: "Events", href: "/dashboard/events", icon: Calendar03Icon },
  { label: "Reviews", href: "/dashboard/reviews", icon: StarIcon },
  { label: "Users", href: "/dashboard/users", icon: UserGroupIcon },
  { label: "Settings", href: "/dashboard/settings", icon: Settings01Icon },
]

export function AdminSidebar({
  isMobileOpen,
  isCollapsed,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname()

  const { destinations } = useAdminDestinations()
  const { events } = useAdminEvents()
  const { reviews } = useAdminReviews()

  // Badge dinamis dari katalog (bukan angka hardcode).
  const badgeFor = (href: string): string | undefined => {
    if (href === "/dashboard/events") return String(events?.length ?? 0)
    if (href === "/dashboard/destinations") return String(destinations?.length ?? 0)
    if (href === "/dashboard/reviews") return String(reviews?.length ?? 0)
    return undefined
  }

  useEffect(() => {
    if (!isMobileOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseMobile()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isMobileOpen, onCloseMobile])

  const navContent = (
    <div className="flex flex-col h-full bg-[#1E2229] text-white select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/10 shrink-0">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 overflow-hidden"
        >
          <div className="w-9 h-9 rounded-xl bg-vox-cream flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
            <Image
              src="/logo-dark.svg"
              alt="Voxlore"
              width={26}
              height={26}
              className="h-6 w-6"
            />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col truncate">
              <span className="font-extrabold text-sm tracking-tight text-white leading-tight">
                Voxlore Admin
              </span>
              <span className="text-[10px] text-white/50 font-medium tracking-wide uppercase">
                Management Studio
              </span>
            </div>
          )}
        </Link>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Tutup menu sidebar"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5" />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {!isCollapsed && (
          <div className="px-3 pb-2 text-[10px] uppercase font-bold tracking-widest text-white/40">
            Navigasi Utama
          </div>
        )}

        {ADMIN_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(`${item.href}/`))
          const badge = badgeFor(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              title={isCollapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-150 ${
                isActive
                  ? "bg-vox-cream text-[#1E2229] shadow-sm font-extrabold"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <HugeiconsIcon
                icon={item.icon}
                className={`w-5 h-5 shrink-0 ${
                  isActive ? "text-[#1E2229]" : "text-white/60"
                }`}
              />

              {!isCollapsed && (
                <div className="flex items-center justify-between flex-1 truncate">
                  <span className="truncate">{item.label}</span>
                  {badge && (
                    <span
                      className={`ml-2 px-2 py-0.5 text-[10px] font-bold rounded-full shrink-0 ${
                        isActive
                          ? "bg-[#1E2229]/15 text-[#1E2229]"
                          : "bg-white/15 text-white/90"
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          )
        })}
      </div>

      <div className="shrink-0 border-t border-white/10 px-3 py-3 text-[0.6875rem] text-white/45">
        Voxlore Admin Studio
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar Sidebar Drawer */}
      <aside
        className={`hidden lg:flex flex-col fixed top-0 bottom-0 left-0 z-40 transition-[width] duration-200 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="Menu navigasi">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-150"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10">
            {navContent}
          </div>
        </div>
      )}
    </>
  )
}
