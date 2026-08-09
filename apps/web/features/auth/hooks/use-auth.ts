"use client"

import { useMutation } from "@tanstack/react-query"
import { loginRequest, registerRequest } from "../data/auth-api"
import type { AuthResponse, AuthUser } from "../data/auth-api"
import type { LoginFormValues, RegisterFormValues } from "../data/auth-schema"

const TOKEN_KEY = "voxlore_token"
const USER_KEY = "voxlore_user"

function persistSession(response: AuthResponse) {
  localStorage.setItem(TOKEN_KEY, response.accessToken)
  localStorage.setItem(USER_KEY, JSON.stringify(response.user))
  document.cookie = `${TOKEN_KEY}=${response.accessToken}; path=/`
}

export function useLogin() {
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: persistSession,
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: registerRequest,
    onSuccess: persistSession,
  })
}

export function useSession() {
  const token =
    typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY)
  const rawUser =
    typeof window === "undefined" ? null : localStorage.getItem(USER_KEY)

  let user: AuthUser | null = null
  if (rawUser) {
    try {
      user = JSON.parse(rawUser) as AuthUser
    } catch {
      user = null
    }
  }

  return {
    token,
    user,
    isAuthenticated: Boolean(token),
  }
}