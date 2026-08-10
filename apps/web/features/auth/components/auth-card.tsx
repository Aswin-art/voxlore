"use client"

import { Suspense, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import type { Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Spinner } from "@workspace/ui/components/spinner"
import ErrorBoundary from "@/components/error-boundary"
import { Navbar } from "@/features/home/components/navbar"
import { loginSchema, registerSchema } from "../data/auth-schema"
import type {
  LoginFormValues,
  RegisterFormValues,
} from "../data/auth-schema"
import { useLogin, useRegister, useSession } from "../hooks/use-auth"
import type { AuthResponse } from "../data/auth-api"

interface AuthCardProps {
  mode: "login" | "register"
}

type AuthFormValues = {
  name?: string
  email: string
  password: string
}

function AuthForm({ mode }: AuthCardProps) {
  const isLogin = mode === "login"
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const { user: sessionUser, isAuthenticated } = useSession()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && sessionUser) {
      const role = sessionUser.role?.toUpperCase() || ""
      if (role.includes("ADMIN")) {
        router.push("/dashboard")
      } else {
        router.push("/home")
      }
    }
  }, [isAuthenticated, sessionUser, router])

  const login = useLogin()
  const register = useRegister()
  const isPending = isLogin ? login.isPending : register.isPending
  const mutationError = isLogin ? login.error : register.error
  const serverMessage = mutationError?.message

  const schema = isLogin ? loginSchema : registerSchema
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(schema) as Resolver<AuthFormValues>,
    defaultValues: { name: "", email: "", password: "" },
  })

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmit = (values: AuthFormValues) => {
    const run = isLogin
      ? (v: LoginFormValues) => login.mutateAsync(v)
      : (v: RegisterFormValues) => register.mutateAsync(v)
    const payload = isLogin
      ? { email: values.email, password: values.password }
      : {
          name: values.name ?? "",
          email: values.email,
          password: values.password,
        }
    run(payload as never).then((res) => {
      const user = (res as AuthResponse | undefined)?.user
      const role = user?.role?.toUpperCase() || ""
      if (role.includes("ADMIN")) {
        router.push("/dashboard")
      } else {
        router.push("/home")
      }
    })
  }

  return (
    <div
      data-nav-theme="light"
      className="h-screen w-screen max-w-full max-h-screen bg-vox-cream text-[#1E2229] flex flex-col lg:flex-row overflow-hidden relative"
    >
      <Navbar theme="light" />

      <div className="hidden lg:block lg:w-1/2 p-2 sm:p-3 lg:p-3 h-full shrink-0">
        <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#1E2229] text-white p-8 lg:p-12 pt-28 sm:pt-32 flex flex-col justify-between shadow-xl border border-border/20">
          <Image
            src="/images/prambanan-hero.png"
            alt="Voxlore Cultural Storytelling"
            fill
            priority
            className="object-cover opacity-45 brightness-75 contrast-105"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E2229] via-[#1E2229]/60 via-45% to-transparent" />

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

      <div className="w-full lg:w-1/2 h-full p-6 sm:p-12 lg:p-16 pt-24 sm:pt-28 lg:pt-32 flex flex-col justify-between overflow-y-auto bg-vox-cream">
        <div className="w-full max-w-md mx-auto my-auto flex flex-col gap-8 py-4">
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

          {serverMessage && (
            <div
              role="alert"
              className="w-full rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-700"
            >
              {serverMessage}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            noValidate
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
                    aria-invalid={Boolean(errors.name)}
                    className="pl-10 h-12 rounded-xl bg-white/80 border-border/60 text-sm text-[#1E2229] placeholder:text-[#1E2229]/40 focus:border-[#1E2229]"
                    {...registerField("name")}
                  />
                  <HugeiconsIcon
                    icon={UserIcon}
                    className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E2229]/50"
                  />
                </div>
                {errors.name && (
                  <p className="text-xs font-medium text-red-600">
                    {errors.name.message}
                  </p>
                )}
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
                  aria-invalid={Boolean(errors.email)}
                  className="pl-10 h-12 rounded-xl bg-white/80 border-border/60 text-sm text-[#1E2229] placeholder:text-[#1E2229]/40 focus:border-[#1E2229]"
                  {...registerField("email")}
                />
                <HugeiconsIcon
                  icon={Mail01Icon}
                  className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E2229]/50"
                />
              </div>
              {errors.email && (
                <p className="text-xs font-medium text-red-600">
                  {errors.email.message}
                </p>
              )}
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
                  aria-invalid={Boolean(errors.password)}
                  className="pl-10 pr-10 h-12 rounded-xl bg-white/80 border-border/60 text-sm text-[#1E2229] placeholder:text-[#1E2229]/40 focus:border-[#1E2229]"
                  {...registerField("password")}
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
              {errors.password && (
                <p className="text-xs font-medium text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="pt-2 w-full">
              <ActionButton
                type="submit"
                variant="dark"
                icon={ArrowRight01Icon}
                className="w-full disabled:opacity-60 disabled:pointer-events-none"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="inline-flex items-center gap-2">
                    <Spinner className="size-4 text-white" />
                    {isLogin ? "Memproses..." : "Membuat Akun..."}
                  </span>
                ) : isLogin ? (
                  "Masuk ke Akun"
                ) : (
                  "Buat Akun Sekarang"
                )}
              </ActionButton>
            </div>
          </form>

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

        <div className="text-center pt-6 text-[11px] text-[#1E2229]/50 font-medium shrink-0">
          Dengan melanjutkan, Anda menyetujui Syarat &amp; Ketentuan serta Kebijakan Privasi Voxlore.
        </div>
      </div>
    </div>
  )
}

export function AuthCard({ mode }: AuthCardProps) {
  return (
    <ErrorBoundary label="Form Autentikasi">
      <Suspense fallback={<AuthSkeleton />}>
        <AuthForm mode={mode} />
      </Suspense>
    </ErrorBoundary>
  )
}

function AuthSkeleton() {
  return (
    <div className="h-screen w-screen max-w-full max-h-screen bg-vox-cream text-[#1E2229] flex flex-col lg:flex-row overflow-hidden relative">
      <div className="hidden lg:block lg:w-1/2 p-2 sm:p-3 lg:p-3 h-full shrink-0">
        <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-[#1E2229]/90 animate-pulse" />
      </div>
      <div className="w-full lg:w-1/2 h-full p-6 sm:p-12 lg:p-16 pt-24 sm:pt-28 lg:pt-32 flex flex-col justify-between overflow-y-auto bg-vox-cream">
        <div className="w-full max-w-md mx-auto my-auto flex flex-col gap-8 py-4">
          <div className="flex flex-col gap-3">
            <div className="h-10 w-3/4 rounded-full bg-[#1E2229]/10 animate-pulse" />
            <div className="h-4 w-5/6 rounded-full bg-[#1E2229]/10 animate-pulse" />
          </div>
          <div className="flex flex-col gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="h-3 w-24 rounded-full bg-[#1E2229]/10 animate-pulse" />
                <div className="h-12 w-full rounded-xl bg-[#1E2229]/10 animate-pulse" />
              </div>
            ))}
            <div className="h-12 w-full rounded-xl bg-[#1E2229]/10 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}