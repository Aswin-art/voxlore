"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  UserIcon,
  CheckmarkBadge01Icon,
  HeadphonesIcon,
  Clock01Icon,
  Download01Icon,
  Globe02Icon,
  Logout01Icon,
  ArrowRight01Icon,
  HelpCircleIcon,
  ShieldKeyIcon,
  CheckIcon,
  Ticket01Icon,
} from "@hugeicons/core-free-icons"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@workspace/ui/components/drawer"

export interface LanguageOption {
  code: string
  name: string
  nativeName: string
  flag: string
}

const LANGUAGES: LanguageOption[] = [
  { code: "id", name: "Bahasa Indonesia", nativeName: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "en", name: "English", nativeName: "English (US)", flag: "🇺🇸" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
]

export default function ProfilePage() {
  const [toast, setToast] = useState<string | null>(null)
  const [isLanguageDrawerOpen, setIsLanguageDrawerOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(LANGUAGES[0]!)

  const userProfile = {
    name: "Aswin Pratama",
    email: "aswin@voxlore.id",
    initials: "AP",
    subscriptionPlan: "Voxlore Full Pass",
    subscriptionStatus: "Aktif hingga Nov 2026",
    audioListened: 34,
    totalDuration: "4.5 Jam",
  }

  const handleAction = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  const handleSelectLanguage = (lang: LanguageOption) => {
    setSelectedLanguage(lang)
    setIsLanguageDrawerOpen(false)
    handleAction(`Bahasa audio diubah ke ${lang.name}`)
  }

  return (
    <div className="p-4 sm:p-5 flex flex-col gap-5 pb-24 relative">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-4 left-4 right-4 max-w-sm mx-auto z-50 p-3 bg-primary text-primary-foreground text-xs font-bold rounded-2xl flex items-center justify-between shadow-2xl animate-in fade-in slide-in-from-top-2">
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="opacity-70 hover:opacity-100 ml-2">
            ✕
          </button>
        </div>
      )}

      {/* Header Title */}
      <div>
        <h1 className="text-xl font-extrabold text-foreground tracking-tight">
          Profil Saya
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Atur informasi akun dan sesuaikan pengalaman audio budayamu
        </p>
      </div>

      {/* User Hero Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-primary/10 via-background to-background border border-border flex flex-col gap-4 shadow-2xs relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-black text-xl shadow-md border border-primary/30">
              {userProfile.initials}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-card rounded-full p-0.5 shadow-xs">
              <HugeiconsIcon icon={CheckmarkBadge01Icon} className="w-4 h-4 text-blue-500 fill-blue-500/10" />
            </div>
          </div>

          <div className="flex flex-col min-w-0">
            <h2 className="text-base font-extrabold text-foreground tracking-tight truncate">
              {userProfile.name}
            </h2>
            <span className="text-xs text-muted-foreground truncate">{userProfile.email}</span>
          </div>
        </div>

        {/* Stats & Subscription Plan Info Card Grid */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/60">
          {/* Card 1: Subscription Plan Info */}
          <div className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-card border border-border text-center">
            <HugeiconsIcon icon={Ticket01Icon} className="w-4 h-4 text-amber-500 mb-0.5" />
            <span className="text-xs font-black text-foreground truncate w-full">
              {userProfile.subscriptionPlan}
            </span>
            <span className="text-[9px] text-muted-foreground font-bold truncate w-full">
              {userProfile.subscriptionStatus}
            </span>
          </div>

          {/* Card 2: Audio Listened */}
          <div className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-card border border-border text-center">
            <HugeiconsIcon icon={HeadphonesIcon} className="w-4 h-4 text-primary mb-0.5" />
            <span className="text-sm font-black text-foreground">{userProfile.audioListened}</span>
            <span className="text-[9px] text-muted-foreground font-bold">Audio Didengar</span>
          </div>

          {/* Card 3: Total Duration */}
          <div className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-card border border-border text-center">
            <HugeiconsIcon icon={Clock01Icon} className="w-4 h-4 text-blue-500 mb-0.5" />
            <span className="text-sm font-black text-foreground">{userProfile.totalDuration}</span>
            <span className="text-[9px] text-muted-foreground font-bold">Total Waktu</span>
          </div>
        </div>
      </div>

      {/* Account Settings Menu Group */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-extrabold text-muted-foreground tracking-wider uppercase px-1">
          Pengaturan Akun &amp; Audio
        </span>

        <div className="rounded-3xl bg-card border border-border divide-y divide-border/60 overflow-hidden shadow-2xs">
          <button
            onClick={() => handleAction("Fitur Edit Profil akan segera hadir...")}
            className="w-full p-4 flex items-center justify-between hover:bg-background/80 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-background border border-border flex items-center justify-center text-primary">
                <HugeiconsIcon icon={UserIcon} className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-foreground">Edit Informasi Profil</span>
                <span className="text-[10px] text-muted-foreground">Perbarui nama lengkap, email, &amp; identitas</span>
              </div>
            </div>
            <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4 text-muted-foreground" />
          </button>

          <button
            onClick={() => handleAction("Buka Pengunduhan Offline...")}
            className="w-full p-4 flex items-center justify-between hover:bg-background/80 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-background border border-border flex items-center justify-center text-blue-500">
                <HugeiconsIcon icon={Download01Icon} className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-foreground">Unduhan Luring (Offline)</span>
                <span className="text-[10px] text-muted-foreground">Putar kisah sejarah tanpa koneksi internet</span>
              </div>
            </div>
            <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4 text-muted-foreground" />
          </button>

          <button
            onClick={() => setIsLanguageDrawerOpen(true)}
            className="w-full p-4 flex items-center justify-between hover:bg-background/80 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-background border border-border flex items-center justify-center text-amber-500">
                <HugeiconsIcon icon={Globe02Icon} className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-foreground">Bahasa Narasi Audio</span>
                <span className="text-[10px] font-bold text-primary">
                  {selectedLanguage.flag} {selectedLanguage.name}
                </span>
              </div>
            </div>
            <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Security & Support Group */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-extrabold text-muted-foreground tracking-wider uppercase px-1">
          Keamanan &amp; Dukungan
        </span>

        <div className="rounded-3xl bg-card border border-border divide-y divide-border/60 overflow-hidden shadow-2xs">
          <button
            onClick={() => handleAction("Buka Pengaturan Keamanan...")}
            className="w-full p-4 flex items-center justify-between hover:bg-background/80 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-background border border-border flex items-center justify-center text-foreground">
                <HugeiconsIcon icon={ShieldKeyIcon} className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-foreground">Keamanan &amp; Kata Sandi</span>
                <span className="text-[10px] text-muted-foreground">Kelola kata sandi &amp; verifikasi akun</span>
              </div>
            </div>
            <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4 text-muted-foreground" />
          </button>

          <button
            onClick={() => handleAction("Buka Pusat Bantuan Voxlore...")}
            className="w-full p-4 flex items-center justify-between hover:bg-background/80 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-background border border-border flex items-center justify-center text-foreground">
                <HugeiconsIcon icon={HelpCircleIcon} className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-foreground">Pusat Bantuan &amp; FAQ</span>
                <span className="text-[10px] text-muted-foreground">Pertanyaan umum &amp; layanan pelanggan</span>
              </div>
            </div>
            <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => handleAction("Sesi telah diakhiri. Sampai jumpa kembali!")}
        className="w-full p-4 rounded-3xl bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 text-xs font-extrabold flex items-center justify-center gap-2 transition-colors cursor-pointer mt-1"
      >
        <HugeiconsIcon icon={Logout01Icon} className="w-4 h-4" />
        <span>Keluar dari Akun</span>
      </button>

      {/* FULLSCREEN SHADCN/UI DRAWER COMPONENT FOR LANGUAGE SELECTOR */}
      <Drawer
        open={isLanguageDrawerOpen}
        onOpenChange={setIsLanguageDrawerOpen}
        showSwipeHandle={true}
      >
        <DrawerContent className="max-h-[80vh] h-auto w-full sm:max-w-md mx-auto rounded-t-3xl border-t border-border bg-card p-0 flex flex-col justify-between">
          {/* Header Bar with Back Button */}
          <DrawerHeader className="p-4 border-b border-border flex items-center gap-3 shrink-0 text-left">

            <div className="flex flex-col min-w-0">
              <DrawerTitle className="text-base font-black text-foreground tracking-tight">
                Pilih Bahasa Audio
              </DrawerTitle>
              <DrawerDescription className="text-xs text-muted-foreground truncate">
                Bahasa narasi untuk audio guide budaya Nusantara
              </DrawerDescription>
            </div>
          </DrawerHeader>

          {/* Fullscreen Options List */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {LANGUAGES.map((lang) => {
              const isSelected = selectedLanguage.code === lang.code
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang)}
                  className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? "bg-primary/10 border-primary text-primary font-extrabold shadow-sm"
                      : "bg-background border-border text-foreground hover:bg-card"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-extrabold">{lang.name}</span>
                      <span className="text-xs opacity-70">{lang.nativeName}</span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <HugeiconsIcon icon={CheckIcon} className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
