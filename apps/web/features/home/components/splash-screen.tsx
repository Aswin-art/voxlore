"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"

const SPLASH_STORAGE_KEY = "voxlore_splash_shown"
const SPLASH_DURATION_MS = 2400

function lockBodyScroll() {
  document.documentElement.classList.add("overflow-hidden")
  document.body.classList.add("overflow-hidden")
}

function unlockBodyScroll() {
  document.documentElement.classList.remove("overflow-hidden")
  document.body.classList.remove("overflow-hidden")
}

export function SplashScreen() {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem(SPLASH_STORAGE_KEY)

    if (hasSeenSplash) {
      setIsMounted(true)
      return
    }

    setIsVisible(true)
    lockBodyScroll()

    const timer = setTimeout(() => {
      setIsVisible(false)
      sessionStorage.setItem(SPLASH_STORAGE_KEY, "true")
      unlockBodyScroll()
    }, SPLASH_DURATION_MS)

    setIsMounted(true)

    return () => {
      clearTimeout(timer)
      unlockBodyScroll()
    }
  }, [])

  // Seamless fallback during hydration to prevent white/content flash
  if (!isMounted) {
    return <div className="fixed inset-0 z-[100] bg-[#101216]" />
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[100] bg-[#101216] text-white flex flex-col items-center justify-center select-none overflow-hidden"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Minimalist Rotated Logo Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-3.5"
            >
              <Image
                src="/logo-light.svg"
                alt="Voxlore Logo"
                width={36}
                height={26}
                className="h-8 sm:h-10 w-auto rotate-180"
                priority
              />
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Voxlore
              </span>
            </motion.div>

            {/* Clean Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-xs sm:text-sm uppercase tracking-[0.25em] text-white/50 font-medium"
            >
              Audio Sinematik Warisan Budaya
            </motion.p>
          </div>

          {/* Sleek Progress Line at Bottom */}
          <div className="absolute bottom-12 w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="w-full h-full bg-white/70"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
