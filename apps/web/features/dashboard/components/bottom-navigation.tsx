"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Home01Icon,
  Compass01Icon,
  QrCode01Icon,
  Calendar01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons"

export function BottomNavigation() {
  const pathname = usePathname()

  const tabs = [
    { id: "home", href: "/home", label: "Beranda", icon: Home01Icon },
    { id: "explore", href: "/explore", label: "Wisata", icon: Compass01Icon },
    { id: "scan", href: "/scan", label: "Scan QR", icon: QrCode01Icon, isCenter: true },
    { id: "events", href: "/events", label: "Festival", icon: Calendar01Icon },
    { id: "profile", href: "/profile", label: "Profil", icon: UserIcon },
  ]

  return (
    <nav className="fixed bottom-0 inset-x-0 w-full sm:max-w-md mx-auto z-40 bg-card/95 backdrop-blur-md border-t border-border pt-2 pb-3 px-2 shadow-2xl">
      <div className="grid grid-cols-5 items-center w-full relative">
        {tabs.map((tab) => {
          // Check if current tab is active (supporting /home, /dashboard, etc.)
          const isActive =
            pathname === tab.href ||
            (tab.href === "/home" && (pathname === "/" || pathname === "/dashboard"))

          if (tab.isCenter) {
            return (
              <div key={tab.id} className="relative flex flex-col items-center justify-center">
                <Link
                  href={tab.href}
                  aria-label="Pindai QR Code di Lokasi"
                  className={`-translate-y-5 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg border-4 border-card transition-all duration-200 cursor-pointer active:scale-95 ${
                    isActive
                      ? "ring-2 ring-primary/40 scale-105"
                      : "hover:scale-105"
                  }`}
                >
                  <HugeiconsIcon icon={tab.icon} className="w-6 h-6 stroke-[2]" />
                </Link>
                <span className="-mt-4 text-[10px] font-black text-foreground tracking-tight">
                  {tab.label}
                </span>
              </div>
            )
          }

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex flex-col items-center gap-1 cursor-pointer transition-all duration-200 py-1 ${
                isActive
                  ? "text-foreground font-extrabold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div
                className={`p-1.5 rounded-full transition-all duration-200 ${
                  isActive ? "bg-background text-foreground scale-105" : "bg-transparent"
                }`}
              >
                <HugeiconsIcon
                  icon={tab.icon}
                  className={`w-5 h-5 ${
                    isActive
                      ? "stroke-[2.25] text-foreground"
                      : "stroke-[1.75]"
                  }`}
                />
              </div>
              <span className="text-[10px] font-extrabold tracking-tight leading-none">
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
