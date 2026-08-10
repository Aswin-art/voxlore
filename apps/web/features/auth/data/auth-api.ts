import type { LoginFormValues, RegisterFormValues } from "./auth-schema"
import { apiRequest } from "./api-client"

export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  phone?: string
  bio?: string
}

export interface AuthResponse {
  user: AuthUser
}

async function authRequest<T>(
  path: string,
  values: Record<string, string>,
): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(values),
  })

  if (!res.ok) {
    const payload = (await res.json().catch(() => null)) as {
      message?: string | string[]
    } | null
    const message = Array.isArray(payload?.message)
      ? payload.message[0]
      : payload?.message
    throw new Error(message ?? "Terjadi kesalahan pada server")
  }

  return res.json() as Promise<T>
}

export function loginRequest(
  values: LoginFormValues,
): Promise<AuthResponse> {
  return authRequest<AuthResponse>("/auth/login", values)
}

export function registerRequest(
  values: RegisterFormValues,
): Promise<AuthResponse> {
  return authRequest<AuthResponse>("/auth/register", values)
}

export function getSessionRequest(): Promise<AuthUser> {
  return apiRequest<AuthUser>("/auth/me")
}

export function logoutRequest(): Promise<{ success: boolean }> {
  return apiRequest<{ success: boolean }>("/auth/logout", { method: "POST" })
}

export function updateProfileRequest(
  values: Pick<AuthUser, "name" | "email" | "phone" | "bio">,
): Promise<AuthUser> {
  return apiRequest<AuthUser>("/auth/me", {
    method: "PUT",
    body: JSON.stringify(values),
  })
}