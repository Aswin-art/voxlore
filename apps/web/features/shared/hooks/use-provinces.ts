"use client"

import { useQuery } from "@tanstack/react-query"

export interface Province {
  code: string
  name: string
}

interface ProvincesResponse {
  data: Province[]
  meta: unknown
}

async function fetchProvinces(): Promise<ProvincesResponse> {
  const response = await fetch("/api/provinces")

  if (!response.ok) {
    throw new Error(`Gagal memuat data provinsi (${response.status})`)
  }

  return response.json() as Promise<ProvincesResponse>
}

export function useProvinces() {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: fetchProvinces,
    select: (data) => data.data,
    staleTime: 1000 * 60 * 60,
  })
}

export type UseProvincesResult = ReturnType<typeof useProvinces>
