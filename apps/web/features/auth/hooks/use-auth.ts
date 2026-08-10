"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  getSessionRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
  updateProfileRequest,
} from "../data/auth-api"

export const SESSION_QUERY_KEY = ["auth", "session"] as const

export function useLogin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(SESSION_QUERY_KEY, user)
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: registerRequest,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(SESSION_QUERY_KEY, user)
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: SESSION_QUERY_KEY })
    },
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateProfileRequest,
    onSuccess: (user) => {
      queryClient.setQueryData(SESSION_QUERY_KEY, user)
    },
  })
}

export function useSession() {
  const session = useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: getSessionRequest,
    retry: false,
    staleTime: 60_000,
  })

  return {
    user: session.data ?? null,
    isAuthenticated: Boolean(session.data),
    isLoading: session.isLoading,
  }
}
