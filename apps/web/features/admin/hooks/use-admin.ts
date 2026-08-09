"use client"

import { useQuery } from "@tanstack/react-query"
import {
  fetchAdminStats,
  fetchAdminDestinations,
  fetchAdminEvents,
  fetchAdminReviews,
} from "../data/admin-api"
import type {
  AdminStatsResponse,
  AdminDestination,
  AdminCulturalEvent,
  AdminReview,
} from "../data/admin-api"

export function useAdminStats() {
  const query = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: fetchAdminStats,
    staleTime: 5 * 60 * 1000,
  })
  return { ...query, stats: query.data as AdminStatsResponse | undefined }
}

export function useAdminDestinations() {
  const query = useQuery({
    queryKey: ["admin", "destinations"],
    queryFn: fetchAdminDestinations,
    staleTime: 5 * 60 * 1000,
  })
  return {
    ...query,
    destinations: query.data as AdminDestination[] | undefined,
  }
}

export function useAdminEvents() {
  const query = useQuery({
    queryKey: ["admin", "events"],
    queryFn: fetchAdminEvents,
    staleTime: 5 * 60 * 1000,
  })
  return {
    ...query,
    events: query.data as AdminCulturalEvent[] | undefined,
  }
}

export function useAdminReviews() {
  const query = useQuery({
    queryKey: ["admin", "reviews"],
    queryFn: fetchAdminReviews,
    staleTime: 5 * 60 * 1000,
  })
  return { ...query, reviews: query.data as AdminReview[] | undefined }
}