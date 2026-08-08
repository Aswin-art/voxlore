"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ExploreGrid } from "@/features/dashboard/components/explore-grid"
import { PopularDestinations, DestinationItem, POPULAR_DESTINATIONS_DATA } from "@/features/dashboard/components/popular-destinations"
import { CulturalEventsSection, CulturalEvent } from "@/features/dashboard/components/cultural-events-section"
import { DestinationDetailSheet } from "@/features/dashboard/components/destination-detail-sheet"

export default function HomePage() {
  const router = useRouter()
  const [selectedDestination, setSelectedDestination] = useState<DestinationItem | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleSelectDestination = (destination: DestinationItem) => {
    setSelectedDestination(destination)
    setIsDetailOpen(true)
  }

  const handleUnlockPass = (destination: DestinationItem) => {
    setIsDetailOpen(false)
    setToastMessage(`Pass untuk ${destination.title} berhasil diaktifkan!`)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const handleSelectEvent = (event: CulturalEvent) => {
    setToastMessage(`Melihat Detail Event: ${event.title}`)
    setTimeout(() => setToastMessage(null), 4000)
  }

  return (
    <div className="flex flex-col">
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
            const eventsEl = document.getElementById("cultural-events-section")
            if (eventsEl) {
              eventsEl.scrollIntoView({ behavior: "smooth" })
            } else {
              setToastMessage("Menampilkan Kalender Festival & Acara Adat")
              setTimeout(() => setToastMessage(null), 3000)
            }
          }
        }}
      />

      {/* 2. Popular Destinations Touch Carousel */}
      <PopularDestinations onSelectDestination={handleSelectDestination} />

      {/* 3. Cultural Events & Ritual Calendar */}
      <CulturalEventsSection onSelectEvent={handleSelectEvent} />

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
