"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HomeHeader } from "@/features/dashboard/components/home-header"
import { ExploreGrid } from "@/features/dashboard/components/explore-grid"
import { PopularDestinations, DestinationItem } from "@/features/dashboard/components/popular-destinations"
import { RecentPlansSection } from "@/features/dashboard/components/recent-plans-section"
import { DestinationDetailSheet } from "@/features/dashboard/components/destination-detail-sheet"
import { ActiveAudioBar } from "@/features/dashboard/components/active-audio-bar"

export default function HomePage() {
  const router = useRouter()
  const [selectedDestination, setSelectedDestination] = useState<DestinationItem | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const userProfile = {
    name: "Aswin",
    greeting: "Selamat Datang,",
    initials: "A",
  }

  const handleSelectDestination = (destination: DestinationItem) => {
    setSelectedDestination(destination)
    setIsDetailOpen(true)
  }

  const handleUnlockPass = (destination: DestinationItem) => {
    setIsDetailOpen(false)
    setToastMessage(`Pass untuk ${destination.title} berhasil diaktifkan!`)
    setTimeout(() => setToastMessage(null), 4000)
  }

  return (
    <div className="flex flex-col">
      {/* Top Bar User Header */}
      <HomeHeader user={userProfile} />

      {toastMessage && (
        <div className="mx-4 my-2 p-3 bg-primary text-primary-foreground text-xs font-bold rounded-2xl flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="opacity-70 hover:opacity-100 ml-2">
            ✕
          </button>
        </div>
      )}

      {/* 1. Exploration Options (Jelajahi Budaya & Jelajahi Festival) */}
      <ExploreGrid
        onSelectCategory={(catId) => {
          if (catId === "explore-culture") {
            router.push("/explore")
          } else if (catId === "explore-festivals") {
            router.push("/events")
          }
        }}
      />

      {/* 2. Popular Destinations Touch Carousel */}
      <PopularDestinations onSelectDestination={handleSelectDestination} />

      {/* 3. Recent Travel Plans Section */}
      <RecentPlansSection className="px-4 sm:px-5 py-4 bg-white dark:bg-background border-t border-border/60" />

      {/* Floating Mini Audio Player (Spotify-style) */}
      <ActiveAudioBar />

      {/* Destination Detail Sheet Modal */}
      <DestinationDetailSheet
        destination={selectedDestination}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onUnlockPass={handleUnlockPass}
      />
    </div>
  )
}
