"use client"

import { useQuery } from "@tanstack/react-query"
import type { NormalizedDestination } from "@/lib/data"
import { toCultureDetail } from "@/features/culture/data/culture-detail-adapter"

/**
 * Mengambil data detail destinasi dari API publik.
 * Melempar error bila id tidak ditemukan (bukan fallback diam-diam), sehingga
 * halaman dapat menampilkan state "not found".
 */
export function useDestinationDetail(id?: string) {
  return useQuery({
    queryKey: ["destination-detail", id],
    queryFn: async () => {
      const response = await fetch(`/api/destinations/${encodeURIComponent(id!)}`)
      if (response.status === 404) throw new Error("Tidak ditemukan")
      if (!response.ok) throw new Error(`Gagal memuat destinasi (${response.status})`)
      const destination = (await response.json()) as NormalizedDestination
      return toCultureDetail(destination)
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export type UseDestinationDetailResult = ReturnType<typeof useDestinationDetail>