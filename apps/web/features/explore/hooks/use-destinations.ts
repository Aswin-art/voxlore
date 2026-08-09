"use client"

import { useQuery } from "@tanstack/react-query"
import type { NormalizedDestination } from "@/lib/data"
import {
  fetchExploreDestinations,
  fetchDestinationCategories,
} from "../data/destinations"
import type { DestinationFilter } from "../data/destinations"

export function useDestinations(filter?: DestinationFilter) {
  const query = useQuery({
    queryKey: ["destinations", filter ?? null],
    queryFn: () => fetchExploreDestinations(filter ?? undefined),
    staleTime: 5 * 60 * 1000,
  })
  return {
    ...query,
    destinations: query.data as NormalizedDestination[] | undefined,
  }
}

export function useDestinationCategories() {
  const query = useQuery({
    queryKey: ["dest-categories"],
    queryFn: fetchDestinationCategories,
    staleTime: 5 * 60 * 1000,
  })
  return { ...query, categories: query.data }
}
