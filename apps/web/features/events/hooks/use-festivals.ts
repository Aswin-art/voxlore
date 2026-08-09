"use client"

import { useQuery } from "@tanstack/react-query"
import type { CulturalFestival } from "@/lib/data"
import {
  fetchFestivals,
  fetchFestivalById,
  fetchProvincesInEvents,
} from "../data/festivals"
import type { TravelPlanFilter } from "../types"

export function useFestivals(filter?: TravelPlanFilter) {
  const query = useQuery({
    queryKey: ["festivals", filter ?? null],
    queryFn: () => fetchFestivals(filter ?? undefined),
    staleTime: 5 * 60 * 1000,
  })
  return { ...query, festivals: query.data }
}

export function useProvincesInEvents() {
  const query = useQuery({
    queryKey: ["festival-provinces"],
    queryFn: fetchProvincesInEvents,
    staleTime: 60 * 60 * 1000,
  })
  return { ...query, provinces: query.data }
}

export function useFestival(id?: string) {
  const query = useQuery({
    queryKey: ["festival", id],
    queryFn: () => fetchFestivalById(id!),
    enabled: !!id,
  })
  return { ...query, festival: query.data as CulturalFestival | undefined }
}
