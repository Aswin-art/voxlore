"use client"

import { ReactNode } from "react"
import { BottomNavigation } from "@/features/dashboard/components/bottom-navigation"

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-card sm:bg-background text-foreground font-sans flex justify-center items-stretch">
      {/* Mobile-first Container Frame (Edge-to-edge on mobile, bordered card frame on desktop) */}
      <main className="w-full min-h-screen bg-card sm:max-w-md sm:border-x sm:border-border sm:shadow-2xl relative flex flex-col pb-24">
        {/* Dynamic Route Page Content */}
        <div className="flex-1 flex flex-col">{children}</div>

        {/* Fixed Mobile Bottom Navigation */}
        <BottomNavigation />
      </main>
    </div>
  )
}
