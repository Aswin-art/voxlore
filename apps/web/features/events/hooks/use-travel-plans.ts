"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchTravelPlans,
  createTravelPlan,
  deleteTravelPlan,
  removeTravelPlanItem,
  type CreateTravelPlanDto,
  type RecentPlanItem,
} from "../data/travel-plans-api"

export function useTravelPlans() {
  const query = useQuery({
    queryKey: ["travel-plans"],
    queryFn: fetchTravelPlans,
    staleTime: 60 * 1000,
  })

  return {
    ...query,
    plans: query.data ?? [],
  }
}

export function useCreateTravelPlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreateTravelPlanDto) => createTravelPlan(dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["travel-plans"] })
    },
  })
}

export function useDeleteTravelPlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteTravelPlan(id),
    onMutate: async (deletedId: string) => {
      await queryClient.cancelQueries({ queryKey: ["travel-plans"] })
      const previousPlans = queryClient.getQueryData<RecentPlanItem[]>(["travel-plans"])

      if (previousPlans) {
        queryClient.setQueryData<RecentPlanItem[]>(
          ["travel-plans"],
          previousPlans.filter((plan) => plan.id !== deletedId),
        )
      }

      return { previousPlans }
    },
    onError: (_err, _deletedId, context) => {
      if (context?.previousPlans) {
        queryClient.setQueryData(["travel-plans"], context.previousPlans)
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["travel-plans"] })
    },
  })
}

export function useRemoveTravelPlanItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ planId, festivalId }: { planId: string; festivalId: string }) =>
      removeTravelPlanItem(planId, festivalId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["travel-plans"] })
    },
  })
}
