"use client"

import Image from "next/image"
import { ActionButton } from "@workspace/ui/components/action-button"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel"

interface Destination {
  id: string
  title: string
  image: string
  description: string
}

const POPULAR_DESTINATIONS: Destination[] = [
  {
    id: "prambanan",
    title: "Candi Prambanan",
    image: "/images/prambanan-hero.png",
    description: "Menelusuri legenda Roro Jonggrang dan keagungan arsitektur Candi Trimurti.",
  },
  {
    id: "borobudur",
    title: "Candi Borobudur",
    image: "/images/hero-background.png",
    description: "Filosofi Kamadhatu hingga Arupadhatu dalam ukiran ribuan relief abad ke-9.",
  },
  {
    id: "bali",
    title: "Tari Kecak Uluwatu",
    image: "/images/bali-culture.png",
    description: "Harmoni ritmis pertunjukan Ramayana di atas tebing samudera saat matahari terbenam.",
  },
  {
    id: "wayang",
    title: "Wayang Kulit Purwa",
    image: "/images/about-culture.png",
    description: "Seni teater bayangan mistis yang kaya akan filosofi dan nilai kearifan lokal.",
  },
  {
    id: "toraja",
    title: "Rambu Solo' Toraja",
    image: "/images/prambanan-hero.png",
    description: "Ritual pemakaman adat kuno suku Toraja yang sarat kehormatan dan tradisi luhur.",
  },
]

interface DestinationCardProps {
  destination: Destination
}

function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="group relative w-full h-full min-h-[420px] sm:min-h-[480px] lg:min-h-[550px] rounded-2xl sm:rounded-3xl overflow-hidden border border-border/40 shadow-lg bg-[#1E2229] text-white flex flex-col justify-end">
      <Image
        src={destination.image}
        alt={destination.title}
        fill
        className="object-cover brightness-80 contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 640px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="relative z-10 p-6 sm:p-7 flex flex-col gap-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
          {destination.title}
        </h3>

        <p className="text-xs sm:text-sm text-white/80 line-clamp-2 leading-relaxed">
          {destination.description}
        </p>
      </div>
    </div>
  )
}

export function CultureListSection() {
  return (
    <section
      id="culture-list-section"
      data-nav-theme="light"
      className="p-2 sm:p-3 lg:p-3 bg-vox-cream text-[#1E2229] min-h-screen lg:h-screen lg:max-h-screen flex flex-col justify-between"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-3 w-full h-full flex-1">
        {/* Left Side: Section Intro */}
        <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl border border-border/40 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white/40 backdrop-blur-sm shadow-xl h-full">
          <div className="w-full flex items-center justify-between shrink-0">
            <span className="text-xs sm:text-sm uppercase tracking-widest font-bold text-[#1E2229]/50">
              [ DESTINASI BUDAYA ]
            </span>
          </div>

          <div className="flex flex-col items-start gap-4 mt-auto pt-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E2229] leading-[1.05] tracking-tight">
              Destinasi Budaya Populer
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-[#1E2229]/80 leading-relaxed font-medium max-w-xl">
              Jelajahi keajaiban narasi sejarah, filosofi kuno, dan kearifan lokal Nusantara yang dikemas dalam panduan audio sinematik—menghidupkan kembali setiap sudut warisan budaya di perjalananmu.
            </p>

            <div className="pt-2">
              <ActionButton variant="dark" icon={ArrowRight01Icon}>
                Jelajahi Semua
              </ActionButton>
            </div>
          </div>
        </div>

        {/* Right Side: Popular Destinations Carousel */}
        <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl border border-border/40 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white/40 backdrop-blur-sm shadow-xl h-full overflow-hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full h-full flex flex-col justify-between"
          >
            <div className="flex items-center justify-between w-full mb-4 shrink-0">
              <span className="text-xs uppercase tracking-widest font-bold text-[#1E2229]/50">
                [ EKSPLOR KATALOG ]
              </span>

              <div className="flex items-center gap-2">
                <CarouselPrevious className="static inset-auto translate-x-0 translate-y-0 hover:bg-[#1E2229] hover:text-white bg-[#1E2229]/10 text-[#1E2229] border border-border/40 w-10 h-10 rounded-md" />
                <CarouselNext className="static inset-auto translate-x-0 translate-y-0 hover:bg-[#1E2229] hover:text-white bg-[#1E2229]/10 text-[#1E2229] border border-border/40 w-10 h-10 rounded-md" />
              </div>
            </div>

            <CarouselContent className="-ml-3 sm:-ml-4 flex-1 my-auto">
              {POPULAR_DESTINATIONS.map((destination) => (
                <CarouselItem
                  key={destination.id}
                  className="pl-3 sm:pl-4 basis-full sm:basis-1/2 h-full"
                >
                  <DestinationCard destination={destination} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
