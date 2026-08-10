"use client"

import { Suspense, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  Camera01Icon,
  UserIcon,
  Mail01Icon,
  CallIcon,
  Tick01Icon,
} from "@hugeicons/core-free-icons"
import { useSession, useUpdateProfile } from "@/features/auth/hooks/use-auth"
import {
  editProfileSchema,
  type EditProfileFormValues,
} from "@/features/shared/data/forms-schema"
import ErrorBoundary from "@/components/error-boundary"
import { Skeleton } from "@workspace/ui/components/skeleton"

export function EditProfilePageSkeleton() {
  return (
    <div className="flex flex-col pb-28 relative w-full min-w-0">
      <header className="sticky top-0 z-30 bg-card p-4 sm:p-5 border-b border-border/60 shadow-xs flex items-center gap-3 w-full min-w-0">
        <Skeleton className="w-9 h-9 rounded-2xl" />
        <div className="flex flex-col gap-2 min-w-0">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
      </header>
      <div className="p-4 sm:p-5 flex flex-col gap-5 w-full">
        <Skeleton className="h-40 w-full rounded-3xl" />
        <Skeleton className="h-14 w-full rounded-2xl" />
        <Skeleton className="h-14 w-full rounded-2xl" />
        <Skeleton className="h-14 w-full rounded-2xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>
    </div>
  )
}

export function EditProfilePage() {
  return (
    <Suspense fallback={<EditProfilePageSkeleton />}>
      <ErrorBoundary label="Edit Profil">
        <EditProfilePageContent />
      </ErrorBoundary>
    </Suspense>
  )
}

export function EditProfilePageContent() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const updateProfile = useUpdateProfile()

  const { user } = useSession()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      bio: user?.bio ?? "",
    },
  })

  const handleSubmitForm = handleSubmit(async (values) => {
    setIsSubmitting(true)
    try {
      await updateProfile.mutateAsync({
        name: values.name,
        email: values.email,
        phone: values.phone,
        bio: values.bio,
      })
      setToast("Profil berhasil diperbarui")
      router.back()
    } catch (error) {
      setToast(error instanceof Error ? error.message : "Profil gagal diperbarui")
    } finally {
      setIsSubmitting(false)
    }
  })

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
            Edit Profil
          </h1>
          <span className="text-xs text-muted-foreground truncate">
            Perbarui informasi data diri akun Voxlore kamu
          </span>
        </div>
      </header>

      {/* Page Content Body */}
      <div className="p-4 sm:p-5 flex flex-col gap-5 w-full">
        {/* Profile Picture Avatar Changer Card */}
        <div className="p-5 rounded-3xl bg-card flex flex-col items-center justify-center gap-3 text-center shadow-2xs">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-primary text-primary-foreground flex items-center justify-center font-black text-2xl shadow-md">
              AP
            </div>

            <button
              type="button"
              onClick={() => setToast("Pilih foto baru dari galeri perangkat 📸")}
              className="absolute -bottom-1.5 -right-1.5 w-8 h-8 rounded-xl bg-foreground text-background flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer"
              title="Ubah Foto Profil"
            >
              <HugeiconsIcon icon={Camera01Icon} className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-sm font-extrabold text-foreground">{watch("name")}</span>
            <span className="text-xs text-muted-foreground">{watch("email")}</span>
          </div>
        </div>

        {/* Main Edit Form */}
        <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
          {/* Input 1: Nama Lengkap (Wajib) */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs font-bold text-foreground">
              Nama Lengkap <span className="text-destructive">*</span>
            </label>
            <div className="relative flex items-center">
              <HugeiconsIcon
                icon={UserIcon}
                className="absolute left-3.5 w-4 h-4 text-muted-foreground pointer-events-none"
              />
              <input
                id="name"
                type="text"
                placeholder="Masukkan nama lengkap kamu"
                className="w-full pl-10 pr-4 py-3 text-xs bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-card transition-all text-foreground placeholder:text-muted-foreground font-medium"
                {...register("name")}
              />
            </div>
            {errors.name?.message && (
              <span className="text-[10px] font-bold text-destructive">{errors.name.message}</span>
            )}
          </div>

          {/* Input 2: Email (Wajib) */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-bold text-foreground">
              Alamat Email <span className="text-destructive">*</span>
            </label>
            <div className="relative flex items-center">
              <HugeiconsIcon
                icon={Mail01Icon}
                className="absolute left-3.5 w-4 h-4 text-muted-foreground pointer-events-none"
              />
              <input
                id="email"
                type="email"
                placeholder="nama@email.com"
                className="w-full pl-10 pr-4 py-3 text-xs bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-card transition-all text-foreground placeholder:text-muted-foreground font-medium"
                {...register("email")}
              />
            </div>
            {errors.email?.message && (
              <span className="text-[10px] font-bold text-destructive">{errors.email.message}</span>
            )}
          </div>

          {/* Input 3: Nomor Telepon (Wajib) */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="text-xs font-bold text-foreground">
              Nomor Telepon <span className="text-destructive">*</span>
            </label>
            <div className="relative flex items-center">
              <HugeiconsIcon
                icon={CallIcon}
                className="absolute left-3.5 w-4 h-4 text-muted-foreground pointer-events-none"
              />
              <input
                id="phone"
                type="tel"
                placeholder="+62 812-xxxx-xxxx"
                className="w-full pl-10 pr-4 py-3 text-xs bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-card transition-all text-foreground placeholder:text-muted-foreground font-medium"
                {...register("phone")}
              />
            </div>
            {errors.phone?.message && (
              <span className="text-[10px] font-bold text-destructive">{errors.phone.message}</span>
            )}
          </div>

          {/* Input 4: Biografi Singkat */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="bio" className="text-xs font-bold text-foreground">
              Biografi Singkat
            </label>
            <textarea
              id="bio"
              rows={3}
              placeholder="Tulis sedikit tentang diri kamu..."
              className="w-full p-3.5 text-xs bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-card transition-all text-foreground placeholder:text-muted-foreground font-medium resize-none"
              {...register("bio")}
            />
            {errors.bio?.message && (
              <span className="text-[10px] font-bold text-destructive">{errors.bio.message}</span>
            )}
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground text-xs font-extrabold shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Menyimpan...</span>
              ) : (
                <>
                  <HugeiconsIcon icon={Tick01Icon} className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
