"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchUserFavorites,
  toggleFavoriteApi,
  type FavoriteItem,
} from "../data/favorites-api"

export const FAVORITES_QUERY_KEY = ["favorites"] as const

/**
 * Hook to query user's favorites from API.
 */
export function useFavorites() {
  const query = useQuery({
    queryKey: FAVORITES_QUERY_KEY,
    queryFn: fetchUserFavorites,
    retry: false,
    staleTime: 2 * 60 * 1000,
  })

  const favoriteIds = new Set((query.data ?? []).map((fav) => fav.id))

  return {
    ...query,
    favorites: query.data ?? [],
    favoriteIds,
    isFavorite: (destinationId: string) => favoriteIds.has(destinationId),
  }
}

/**
 * Hook to toggle a favorite destination with optimistic cache updates.
 */
export function useToggleFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (destinationId: string) => toggleFavoriteApi(destinationId),
    onMutate: async (destinationId: string) => {
      await queryClient.cancelQueries({ queryKey: FAVORITES_QUERY_KEY })
      const previousFavorites = queryClient.getQueryData<FavoriteItem[]>(FAVORITES_QUERY_KEY)

      if (previousFavorites) {
        const exists = previousFavorites.some((fav) => fav.id === destinationId)
        if (exists) {
          queryClient.setQueryData<FavoriteItem[]>(
            FAVORITES_QUERY_KEY,
            previousFavorites.filter((fav) => fav.id !== destinationId),
          )
        } else {
          queryClient.setQueryData<FavoriteItem[]>(FAVORITES_QUERY_KEY, [
            ...previousFavorites,
            {
              favoriteId: `temp-${destinationId}`,
              id: destinationId,
              title: "",
              category: "",
              province: "",
              location: "",
              rating: 0,
              duration: "",
              listeners: "",
              image: "",
              audioSpotsCount: 0,
              createdAt: new Date().toISOString(),
            },
          ])
        }
      }

      return { previousFavorites }
    },
    onError: (_err, _destinationId, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(FAVORITES_QUERY_KEY, context.previousFavorites)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY })
    },
  })
}
