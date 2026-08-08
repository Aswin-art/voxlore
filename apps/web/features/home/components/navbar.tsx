"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { MenuTwoLineIcon, Cancel01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from "@workspace/ui/components/sheet"
import { ActionButton } from "@workspace/ui/components/action-button"

interface NavLink {
  name: string
  href: string
}

const NAV_LINKS: NavLink[] = [
  { name: "BERANDA", href: "/#" },
  { name: "PHILOSOPHY", href: "/#about-section" },
  { name: "CARA KERJA", href: "/#how-it-works-section" },
  { name: "DESTINASI BUDAYA", href: "/#culture-list-section" },
]

function useSectionThemeObserver(forcedTheme?: "dark" | "light") {
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("dark")

  useEffect(() => {
    if (forcedTheme) return

    const initialElement = document.querySelector("[data-nav-theme]")
    if (initialElement) {
      const theme = initialElement.getAttribute("data-nav-theme")
      if (theme === "dark" || theme === "light") {
        setCurrentTheme(theme)
      }
    }

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -50% 0px",
      threshold: 0,
    }

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const theme = entry.target.getAttribute("data-nav-theme")
          if (theme === "dark" || theme === "light") {
            setCurrentTheme(theme)
          }
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions)
    const sections = document.querySelectorAll("[data-nav-theme]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [forcedTheme])

  return forcedTheme ?? currentTheme
}

interface NavbarProps {
  theme?: "dark" | "light"
}

export function Navbar({ theme: forcedTheme }: NavbarProps = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeNav, setActiveNav] = useState("BERANDA")

  const activeTheme = useSectionThemeObserver(forcedTheme)
  const isDarkHeader = isOpen || activeTheme === "dark"

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* Fixed Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-[60] p-4 sm:p-6 lg:p-8 flex items-center justify-between pointer-events-none">
        {/* Left: Logo & Brand */}
        <Link href="/" className="flex items-center gap-3 sm:gap-3.5 pointer-events-auto group">
          <div className="relative h-9 sm:h-10 w-9 sm:w-10 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={isDarkHeader ? "light-logo" : "dark-logo"}
                initial={{ opacity: 0, scale: 0.9, rotate: 180 }}
                animate={{ opacity: 1, scale: 1, rotate: 180 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 180 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src={isDarkHeader ? "/logo-light.svg" : "/logo-dark.svg"}
                  alt="Voxlore Logo"
                  width={42}
                  height={30}
                  className="h-9 sm:h-10 w-auto"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.span
            animate={{ color: isDarkHeader ? "#FFFFFF" : "#1E2229" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-3xl sm:text-4xl font-black tracking-tight"
          >
            Voxlore
          </motion.span>
        </Link>

        {/* Right: Hamburger/Close Button */}
        <SheetTrigger
          aria-label="Toggle menu"
          className="p-2 pointer-events-auto focus:outline-none cursor-pointer bg-transparent border-none"
        >
          <motion.div
            animate={{ color: isDarkHeader ? "#FFFFFF" : "#1E2229" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? "cancel-icon" : "menu-icon"}
                initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <HugeiconsIcon
                  icon={isOpen ? Cancel01Icon : MenuTwoLineIcon}
                  className="w-9 h-9 sm:w-10 sm:h-10"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </SheetTrigger>
      </header>

      {/* Fullscreen Navigation Sheet */}
      <AnimatePresence>
        {isOpen && (
          <SheetContent
            side="right"
            showCloseButton={false}
            className="fixed inset-0 z-50 !w-screen !max-w-none !h-screen bg-[#101216] text-white p-4 sm:p-6 lg:p-8 pt-28 sm:pt-32 flex flex-col justify-between border-none outline-none shadow-none rounded-none overflow-y-auto"
          >
            <motion.div
              initial={{ clipPath: "circle(0% at calc(100% - 3.5rem) 3.5rem)", opacity: 0 }}
              animate={{ clipPath: "circle(150% at calc(100% - 3.5rem) 3.5rem)", opacity: 1 }}
              exit={{ clipPath: "circle(0% at calc(100% - 3.5rem) 3.5rem)", opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
              className="flex flex-col justify-between h-full w-full flex-1"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Navigasi Utama Voxlore</SheetTitle>
                <SheetDescription>
                  Menu navigasi fullscreen untuk menjelajahi situs budaya dan cerita warisan nusantara.
                </SheetDescription>
              </SheetHeader>

              {/* Main Content Layout */}
              <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between w-full my-auto flex-1 py-6 gap-8">
                {/* Brand Narrative Block */}
                <div className="flex flex-col gap-4 text-left max-w-md mt-auto order-2 lg:order-1">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    Menghidupkan Kembali Sejarah Nusantara
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed font-medium">
                    Voxlore menyajikan kisah sejarah, legenda kuno, dan kearifan lokal dalam bentuk narasi audio sinematik dwibahasa yang dapat diakses instan di lokasi wisata.
                  </p>
                  <div className="pt-2">
                    <ActionButton
                      variant="white"
                      icon={ArrowRight01Icon}
                      onClick={() => {
                        setIsOpen(false)
                        window.location.hash = "#culture-list-section"
                      }}
                    >
                      Jelajahi Budaya
                    </ActionButton>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col items-start lg:items-end justify-center gap-5 sm:gap-10 order-1 lg:order-2 my-auto lg:pr-8">
                  {NAV_LINKS.map((item) => {
                    const isActive = activeNav === item.name
                    return (
                      <div
                        key={item.name}
                        className="flex flex-col items-start lg:items-end gap-2 group"
                      >
                        <a
                          href={item.href}
                          onClick={() => {
                            setActiveNav(item.name)
                            setIsOpen(false)
                          }}
                          className={`flex items-center gap-3 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight transition-colors duration-300 uppercase ${
                            isActive
                              ? "text-white"
                              : "text-white/70 hover:text-white"
                          }`}
                        >
                          <span
                            className={`text-[#FFFFFF] transition-opacity text-base font-bold ${
                              isActive
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                            }`}
                          >
                            •
                          </span>
                          <span>{item.name}</span>
                        </a>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Bottom Footer Bar */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-2 border-t border-white/10 shrink-0 text-xs tracking-widest text-white/40 font-medium uppercase">
                <span className="pl-10 sm:pl-0">© {new Date().getFullYear()} VOXLORE. ALL RIGHTS RESERVED.</span>
              </div>
            </motion.div>
          </SheetContent>
        )}
      </AnimatePresence>
    </Sheet>
  )
}
