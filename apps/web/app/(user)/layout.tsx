"use client"

import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header"
import { BottomNavigation } from "@/features/dashboard/components/bottom-navigation"
import { ActiveAudioBar } from "@/features/dashboard/components/active-audio-bar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const userProfile = {
    name: "Aswin",
    greeting: "Selamat Datang,",
    initials: "A",
  }

  // Hide top header on culture detail & culture reviews pages
  const isCultureRoute = pathname.startsWith("/culture")

  return (
    <div className="min-h-screen bg-card sm:bg-background text-foreground font-sans flex justify-center items-stretch">
      {/* Mobile-first Container Frame (Edge-to-edge on mobile, bordered card frame on desktop) */}
      <main className="w-full min-h-screen bg-card sm:max-w-md sm:border-x sm:border-border sm:shadow-2xl relative flex flex-col pb-24">
        {/* Render header only when not on culture detail/review subpages */}
        {!isCultureRoute && <DashboardHeader user={userProfile} />}

        {/* Dynamic Route Page Content */}
        <div className="flex-1 flex flex-col">{children}</div>

        {/* Floating Mini Audio Player (Spotify-style) */}
        <ActiveAudioBar />

        {/* Fixed Mobile Bottom Navigation */}
        <BottomNavigation />
      </main>
    </div>
  )
}
