"use client"

import { useQuery } from "@tanstack/react-query"
import { getDestinationById } from "@/lib/data"
import { toCultureDetail } from "@/features/culture/data/culture-detail-adapter"

/** Delay kecil untuk memperlihatkan skeleton saat loading demo. */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Mengambil data detail destinasi dari sumber kebenaran `lib/data`.
 * Melempar error bila id tidak ditemukan (bukan fallback diam-diam), sehingga
 * halaman dapat menampilkan state "not found".
 */
export function useDestinationDetail(id?: string) {
  return useQuery({
    queryKey: ["destination-detail", id],
    queryFn: async () => {
      await delay(250)
      const dest = getDestinationById(id!)
      if (!dest) throw new Error("Tidak ditemukan")
      return toCultureDetail(dest)
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export type UseDestinationDetailResult = ReturnType<typeof useDestinationDetail>