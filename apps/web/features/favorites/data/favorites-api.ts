import { apiRequest } from "@/features/auth/data/api-client"

export interface FavoriteItem {
  favoriteId: string
  id: string
  title: string
  category: string
  province: string
  location: string
  rating: number
  duration: string
  listeners: string
  image: string
  audioSpotsCount: number
  createdAt: string
}

export interface ToggleFavoriteResponse {
  isFavorite: boolean
  message: string
}

/**
 * Fetch all favorites for the authenticated user.
 */
export async function fetchUserFavorites(): Promise<FavoriteItem[]> {
  return apiRequest<FavoriteItem[]>("/favorites")
}

/**
 * Toggle favorite status for a destination.
 */
export async function toggleFavoriteApi(destinationId: string): Promise<ToggleFavoriteResponse> {
  return apiRequest<ToggleFavoriteResponse>("/favorites/toggle", {
    method: "POST",
    body: JSON.stringify({ destinationId }),
  })
}
