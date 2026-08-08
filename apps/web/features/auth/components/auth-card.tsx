"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Mail01Icon,
  LockPasswordIcon,
  UserIcon,
  ViewIcon,
  ViewOffIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { ActionButton } from "@workspace/ui/components/action-button"
import { Navbar } from "@/features/home/components/navbar"

interface AuthCardProps {
  mode: "login" | "register"
}

export function AuthCard({ mode }: AuthCardProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isLogin = mode === "login"

  return (
    <div
      data-nav-theme="light"
      className="h-screen w-screen max-w-full max-h-screen bg-vox-cream text-[#1E2229] flex flex-col lg:flex-row overflow-hidden relative"
    >
      {/* Shared Fullscreen Header Navbar (Forced to light theme -> dark text & logo for cream bg) */}
      <Navbar theme="light" />

      {/* Left Side: Visual Hero Card with Thin Outer Margin */}
      <div className="hidden lg:block lg:w-1/2 p-2 sm:p-3 lg:p-3 h-full shrink-0">
        <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#1E2229] text-white p-8 lg:p-12 pt-28 sm:pt-32 flex flex-col justify-between shadow-xl border border-border/20">
          {/* Visual Overlay Image */}
          <Image
            src="/images/prambanan-hero.png"
            alt="Voxlore Cultural Storytelling"
            fill
            priority
            className="object-cover opacity-45 brightness-75 contrast-105"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E2229] via-[#1E2229]/60 via-45% to-transparent" />

          {/* Bottom Narrative Text */}
          <div className="relative z-10 flex flex-col gap-3 mt-auto pt-12">
            <span className="text-xs uppercase tracking-widest font-bold text-white/50">
              [ NIKMATI NARASI NUSA ]
            </span>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Satu Akun untuk Menjelajah Ratusan Cerita Warisan Budaya.
            </h2>
            <p className="text-sm lg:text-base text-white/75 leading-relaxed font-normal max-w-xl">
              Simpan riwayat panduan audio favoritmu, jelajahi peta interaktif situs bersejarah, dan rasakan musik etnik sinematik Nusantara.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: True Edge-to-Edge Minimalist Form Column (Cream Bg) */}
      <div className="w-full lg:w-1/2 h-full p-6 sm:p-12 lg:p-16 pt-24 sm:pt-28 lg:pt-32 flex flex-col justify-between overflow-y-auto bg-vox-cream">
        {/* Center Form Block */}
        <div className="w-full max-w-md mx-auto my-auto flex flex-col gap-8 py-4">
          {/* Header Title */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1E2229] tracking-tight">
              {isLogin ? "Selamat Datang" : "Buat Akun Baru"}
            </h1>
            <p className="text-sm text-[#1E2229]/70 leading-relaxed">
              {isLogin
                ? "Masuk untuk melanjutkan pengalaman eksplorasi cerita budaya."
                : "Daftar gratis untuk mulai menyimpan panduan audio favoritmu."}
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
            className="flex flex-col gap-4"
          >
            {!isLogin && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="register-name" className="text-xs font-bold text-[#1E2229]">
                  Nama Lengkap
                </Label>
                <div className="relative">
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Nama Anda"
                    className="pl-10 h-12 rounded-xl bg-white/80 border-border/60 text-sm text-[#1E2229] placeholder:text-[#1E2229]/40 focus:border-[#1E2229]"
                    required
                  />
                  <HugeiconsIcon
                    icon={UserIcon}
                    className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E2229]/50"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="auth-email" className="text-xs font-bold text-[#1E2229]">
                Alamat Email
              </Label>
              <div className="relative">
                <Input
                  id="auth-email"
                  type="email"
                  placeholder="nama@email.com"
                  className="pl-10 h-12 rounded-xl bg-white/80 border-border/60 text-sm text-[#1E2229] placeholder:text-[#1E2229]/40 focus:border-[#1E2229]"
                  required
                />
                <HugeiconsIcon
                  icon={Mail01Icon}
                  className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E2229]/50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="auth-password" className="text-xs font-bold text-[#1E2229]">
                  Kata Sandi
                </Label>
                {isLogin && (
                  <a
                    href="#"
                    className="text-xs font-semibold text-[#1E2229]/70 hover:text-[#1E2229] underline transition-colors"
                  >
                    Lupa kata sandi?
                  </a>
                )}
              </div>
              <div className="relative">
                <Input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={isLogin ? "••••••••" : "Minimal 8 karakter"}
                  className="pl-10 pr-10 h-12 rounded-xl bg-white/80 border-border/60 text-sm text-[#1E2229] placeholder:text-[#1E2229]/40 focus:border-[#1E2229]"
                  required
                />
                <HugeiconsIcon
                  icon={LockPasswordIcon}
                  className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E2229]/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1E2229]/50 hover:text-[#1E2229] transition-colors"
                >
                  <HugeiconsIcon
                    icon={showPassword ? ViewOffIcon : ViewIcon}
                    className="w-4 h-4"
                  />
                </button>
              </div>
            </div>

            <div className="pt-2 w-full">
              <ActionButton
                type="submit"
                variant="dark"
                icon={ArrowRight01Icon}
                className="w-full"
              >
                {isLogin ? "Masuk ke Akun" : "Buat Akun Sekarang"}
              </ActionButton>
            </div>
          </form>

          {/* Switch Page Link */}
          <div className="text-center text-xs sm:text-sm text-[#1E2229]/70 font-medium">
            {isLogin ? (
              <>
                Belum punya akun?{" "}
                <Link
                  href="/register"
                  className="font-bold text-[#1E2229] underline hover:text-black transition-colors"
                >
                  Daftar gratis
                </Link>
              </>
            ) : (
              <>
                Sudah punya akun?{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#1E2229] underline hover:text-black transition-colors"
                >
                  Masuk di sini
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Footer Terms */}
        <div className="text-center pt-6 text-[11px] text-[#1E2229]/50 font-medium shrink-0">
          Dengan melanjutkan, Anda menyetujui Syarat &amp; Ketentuan serta Kebijakan Privasi Voxlore.
        </div>
      </div>
    </div>
  )
}
