"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader, UserProfile } from "./dashboard-header"
import { ExploreGrid } from "./explore-grid"
import { ActiveAudioBar } from "./active-audio-bar"
import { PopularDestinations, DestinationItem, POPULAR_DESTINATIONS_DATA } from "./popular-destinations"
import { CulturalEventsSection, CulturalEvent } from "./cultural-events-section"
import { DestinationDetailSheet } from "./destination-detail-sheet"
import { BottomNavigation } from "./bottom-navigation"

export type NavTab = "home" | "discover" | "scan" | "favorites" | "profile"

export function HomeView() {
  const router = useRouter()
  const [userProfile] = useState<UserProfile>({
    name: "Aswin",
    greeting: "Selamat Datang,",
    initials: "A",
  })
  const [activeTab, setActiveTab] = useState<NavTab>("home")
  const [selectedDestination, setSelectedDestination] = useState<DestinationItem | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [activeAudioToast, setActiveAudioToast] = useState<string | null>(null)

  const handleSelectDestination = (destination: DestinationItem) => {
    setSelectedDestination(destination)
    setIsDetailOpen(true)
  }

  const handleUnlockPass = (destination: DestinationItem) => {
    setIsDetailOpen(false)
    setActiveAudioToast(`Pass untuk ${destination.title} berhasil diaktifkan!`)
    setTimeout(() => setActiveAudioToast(null), 4000)
  }

  const handleSelectEvent = (event: CulturalEvent) => {
    setActiveAudioToast(`Melihat Detail Event: ${event.title}`)
    setTimeout(() => setActiveAudioToast(null), 4000)
  }

  return (
    <div className="min-h-screen bg-card sm:bg-background text-foreground font-sans flex justify-center items-stretch">
      {/* Mobile-first Layout Container (Edge-to-edge on mobile, bordered card frame on desktop) */}
      <main className="w-full min-h-screen bg-card sm:max-w-md sm:border-x sm:border-border sm:shadow-2xl relative flex flex-col pb-24">
        {/* Header with User Profile (Avatar, Greeting, Name) */}
        <DashboardHeader user={userProfile} />

        {/* Toast Notification Banner */}
        {activeAudioToast && (
          <div className="mx-4 my-2 p-3 bg-primary text-primary-foreground text-xs font-bold rounded-2xl flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
            <span>{activeAudioToast}</span>
            <button
              onClick={() => setActiveAudioToast(null)}
              className="opacity-70 hover:opacity-100 ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Tab 1: Beranda (Home) */}
        {activeTab === "home" && (
          <div className="flex flex-col">
            {/* 1. Exploration Grid Options (Jelajahi Budaya & Jelajahi Festival) */}
            <ExploreGrid
              onSelectCategory={(catId) => {
                if (catId === "explore-culture") {
                  router.push("/explore")
                } else if (catId === "explore-festivals") {
                  const eventsEl = document.getElementById("cultural-events-section")
                  if (eventsEl) {
                    eventsEl.scrollIntoView({ behavior: "smooth" })
                  } else {
                    setActiveAudioToast("Menampilkan Kalender Festival & Acara Adat")
                    setTimeout(() => setActiveAudioToast(null), 3000)
                  }
                }
              }}
            />

            {/* 2. Popular Destinations Touch Carousel */}
            <PopularDestinations
              onSelectDestination={handleSelectDestination}
            />

            {/* 3. Cultural Events & Ritual Calendar */}
            <CulturalEventsSection
              onSelectEvent={handleSelectEvent}
            />
          </div>
        )}

        {/* Tab 2: Jelajahi Budaya */}
        {activeTab === "discover" && (
          <div className="p-5 flex flex-col gap-4">
            <h2 className="text-xl font-extrabold text-foreground">Jelajahi Budaya</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Katalog lengkap situs candi bersejarah, ritual adat daerah, dan seni tradisional Nusantara.
            </p>
            <PopularDestinations onSelectDestination={handleSelectDestination} />
          </div>
        )}

        {/* Tab 3: Scan QR Camera View */}
        {activeTab === "scan" && (
          <div className="p-6 flex flex-col items-center justify-center gap-6 my-auto text-center">
            <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center text-foreground border border-border shadow-2xs animate-pulse">
              📷
            </div>
            <div className="flex flex-col gap-1 max-w-xs">
              <h2 className="text-lg font-extrabold text-foreground">Pindai Kode QR Wisata</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Arahkan kamera ponselmu ke papan QR Code di lokasi situs budaya untuk mendengarkan narasi audio instan.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Favorit (Destinasi Favorit Saya) */}
        {activeTab === "favorites" && (
          <div className="p-5 flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-foreground">Destinasi Favorit Saya</h2>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                Koleksi situs candi &amp; audio guide terfavorit yang kamu simpan untuk didengarkan kembali.
              </p>
            </div>
            <PopularDestinations onSelectDestination={handleSelectDestination} />
          </div>
        )}

        {/* Tab 5: Profil */}
        {activeTab === "profile" && (
          <div className="p-5 flex flex-col gap-4">
            <h2 className="text-xl font-extrabold text-foreground">Profil Saya</h2>
            <div className="p-4 rounded-2xl bg-background border border-border flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-extrabold text-lg">
                {userProfile.initials}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold">{userProfile.name}</span>
                <span className="text-xs text-muted-foreground">Member Freemium Voxlore</span>
              </div>
            </div>
          </div>
        )}

        {/* Floating Mini Audio Player (Spotify-style) */}
        <ActiveAudioBar
          onOpenPlayer={() => handleSelectDestination(POPULAR_DESTINATIONS_DATA[0]!)}
        />

        {/* Destination Detail Sheet Modal */}
        <DestinationDetailSheet
          destination={selectedDestination}
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          onUnlockPass={handleUnlockPass}
        />

        {/* Bottom Navigation */}
        <BottomNavigation />
      </main>
    </div>
  )
}
