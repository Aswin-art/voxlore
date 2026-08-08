"use client"

import Image from "next/image"
import { ActionButton } from "@workspace/ui/components/action-button"
import { ArrowDown01Icon } from "@hugeicons/core-free-icons"

export function HeroSection() {
  const scrollToAbout = () => {
    document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div
      id="hero-section"
      data-nav-theme="dark"
      className="p-2 sm:p-3 lg:p-3 bg-vox-cream text-foreground min-h-screen lg:h-screen lg:max-h-screen flex flex-col"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-3 w-full flex-1">
        <div className="lg:col-span-8 relative min-h-[480px] sm:min-h-[560px] lg:min-h-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-border/40 flex flex-col justify-end p-6 sm:p-10 lg:p-12 h-full">
          <Image
            src="/images/hero-daylight.png"
            alt="Uluwatu Temple Bali Daylight Cultural Heritage"
            fill
            priority
            className="object-cover brightness-90 contrast-[1.02]"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
          {/* Black to Transparent Gradient from Bottom to Top for Maximum Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 via-45% to-transparent" />

          <div className="relative z-10 flex flex-col items-start gap-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] max-w-3xl drop-shadow-lg">
              Dengar Cerita di Balik Warisan Budaya
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-xl leading-relaxed font-normal drop-shadow-sm">
              Nikmati panduan audio dwibahasa berbasis narasi pengisi suara lokal dan lanskap musik tradisional sinematik instan via QR Code.
            </p>

            <div className="pt-2">
              <ActionButton>Mulai Jelajahi</ActionButton>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-2 sm:gap-3 h-full">
          <div className="grid grid-cols-2 lg:flex lg:flex-col gap-2 sm:gap-3 flex-[1.25]">
            <div className="relative min-h-[160px] sm:min-h-[200px] lg:min-h-0 lg:flex-1 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-border/40 flex flex-col justify-end p-4 sm:p-6 lg:p-8">
              <Image
                src="/images/borobudur-card.png"
                alt="Borobudur Morning Daylight Cultural Heritage"
                fill
                priority
                className="object-cover brightness-90 contrast-[1.02]"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

              <div className="relative z-10 flex flex-col items-start gap-1">
                <span className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
                  150+
                </span>
                <h3 className="text-xs sm:text-base lg:text-lg font-bold text-white leading-tight">
                  Destinasi &amp; Warisan Budaya
                </h3>
                <p className="text-[10px] sm:text-xs text-white/75 leading-relaxed hidden sm:block">
                  Dari Sabang sampai Merauke terhubung dalam panduan naratif.
                </p>
              </div>
            </div>

            <div className="relative min-h-[160px] sm:min-h-[200px] lg:min-h-0 lg:flex-1 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-border/40 flex flex-col justify-end p-4 sm:p-6 lg:p-8">
              <Image
                src="/images/dancer-card.png"
                alt="Seni Tari Tradisional Legong Bali"
                fill
                priority
                className="object-cover brightness-90 contrast-[1.02]"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

              <div className="relative z-10 flex flex-col items-start gap-1">
                <span className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
                  300+
                </span>
                <h3 className="text-xs sm:text-base lg:text-lg font-bold text-white">
                  Panduan Audio Sinematik
                </h3>
                <p className="text-[10px] sm:text-xs text-white/80 hidden sm:block">
                  Pengalaman audio dwibahasa jernih dengan musik etnik asli.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-initial p-3 sm:p-4 lg:p-5 flex flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-col items-start gap-0.5 max-w-[60%]">
              <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-[#1E2229] leading-tight">
                Eksplor Fitur
              </h3>
              <p className="text-xs text-[#1E2229]/75 leading-snug">
                Jelajahi panduan audio interaktif &amp; peta budaya.
              </p>
            </div>

            <ActionButton
              icon={ArrowDown01Icon}
              variant="dark"
              onClick={scrollToAbout}
              className="shrink-0 scale-90 sm:scale-95 origin-right"
            >
              Lihat Fitur
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  )
}
