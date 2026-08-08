"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  LockIcon,
  Key01Icon,
  ViewIcon,
  ViewOffIcon,
  Tick01Icon,
} from "@hugeicons/core-free-icons"

export default function SecurityPage() {
  const router = useRouter()
  const [toast, setToast] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setToast("Konfirmasi kata sandi baru tidak cocok ❌")
      setTimeout(() => setToast(null), 3000)
      return
    }

    if (passwordForm.newPassword.length < 8) {
      setToast("Kata sandi minimal 8 karakter ⚠️")
      setTimeout(() => setToast(null), 3000)
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setToast("Kata sandi berhasil diperbarui 🔒")
      setTimeout(() => {
        router.back()
      }, 1200)
    }, 1000)
  }

  return (
    <div className="flex flex-col pb-28 relative w-full min-w-0">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-4 left-4 right-4 max-w-sm mx-auto z-50 p-3 bg-primary text-primary-foreground text-xs font-bold rounded-2xl flex items-center justify-between shadow-2xl animate-in fade-in slide-in-from-top-2">
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="opacity-70 hover:opacity-100 ml-2 cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-30 bg-card p-4 sm:p-5 border-b border-border/60 shadow-xs flex items-center gap-3 w-full min-w-0">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-9 h-9 rounded-2xl border border-border bg-background flex items-center justify-center text-foreground hover:bg-card transition-colors cursor-pointer shrink-0"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
        </button>
        <div className="flex flex-col min-w-0">
          <h1 className="text-lg font-extrabold text-foreground tracking-tight truncate">
            Ubah Kata Sandi
          </h1>
          <span className="text-xs text-muted-foreground truncate">
            Perbarui kata sandi untuk menjaga keamanan akun kamu
          </span>
        </div>
      </header>

      {/* Main Form Content Area */}
      <div className="p-4 sm:p-5 flex flex-col gap-5 w-full">
        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
          {/* Field 1: Kata Sandi Saat Ini */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="currentPassword" className="text-xs font-bold text-foreground">
              Kata Sandi Saat Ini <span className="text-destructive">*</span>
            </label>
            <div className="relative flex items-center">
              <HugeiconsIcon
                icon={Key01Icon}
                className="absolute left-3.5 w-4 h-4 text-muted-foreground pointer-events-none"
              />
              <input
                id="currentPassword"
                name="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                required
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Masukkan kata sandi lama"
                className="w-full pl-10 pr-10 py-3 text-xs bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-card transition-all text-foreground placeholder:text-muted-foreground font-medium"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 text-muted-foreground hover:text-foreground p-1 cursor-pointer"
              >
                <HugeiconsIcon
                  icon={showCurrentPassword ? ViewOffIcon : ViewIcon}
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>

          {/* Field 2: Kata Sandi Baru */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="newPassword" className="text-xs font-bold text-foreground">
              Kata Sandi Baru <span className="text-destructive">*</span>
            </label>
            <div className="relative flex items-center">
              <HugeiconsIcon
                icon={LockIcon}
                className="absolute left-3.5 w-4 h-4 text-muted-foreground pointer-events-none"
              />
              <input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                required
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                placeholder="Minimal 8 karakter"
                className="w-full pl-10 pr-10 py-3 text-xs bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-card transition-all text-foreground placeholder:text-muted-foreground font-medium"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 text-muted-foreground hover:text-foreground p-1 cursor-pointer"
              >
                <HugeiconsIcon
                  icon={showNewPassword ? ViewOffIcon : ViewIcon}
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>

          {/* Field 3: Konfirmasi Kata Sandi Baru */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmPassword" className="text-xs font-bold text-foreground">
              Konfirmasi Kata Sandi Baru <span className="text-destructive">*</span>
            </label>
            <div className="relative flex items-center">
              <HugeiconsIcon
                icon={LockIcon}
                className="absolute left-3.5 w-4 h-4 text-muted-foreground pointer-events-none"
              />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Ulangi kata sandi baru"
                className="w-full pl-10 pr-10 py-3 text-xs bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-card transition-all text-foreground placeholder:text-muted-foreground font-medium"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 text-muted-foreground hover:text-foreground p-1 cursor-pointer"
              >
                <HugeiconsIcon
                  icon={showConfirmPassword ? ViewOffIcon : ViewIcon}
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-extrabold text-xs hover:opacity-90 transition-opacity shadow-md disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Menyimpan...</span>
              ) : (
                <>
                  <HugeiconsIcon icon={Tick01Icon} className="w-4 h-4" />
                  <span>Simpan Kata Sandi</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
