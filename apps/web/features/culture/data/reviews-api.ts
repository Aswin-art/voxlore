import { apiRequest } from "@/features/auth/data/api-client"

export interface ReviewRecord {
  id: string
  userName: string
  destination: string
  destinationId?: string
  rating: number
  comment: string
  status?: "PENDING" | "APPROVED" | "REJECTED"
  verified: boolean
  helpfulCount: number
  tags: string[]
  createdAt: string
}

export function fetchReviews(destinationId: string) {
  return apiRequest<ReviewRecord[]>(
    `/destinations/${encodeURIComponent(destinationId)}/reviews`,
  )
}

export function createReview(input: {
  destinationId: string
  rating: number
  comment: string
  tags?: string[]
}) {
  return apiRequest<ReviewRecord>(
    `/destinations/${encodeURIComponent(input.destinationId)}/reviews`,
    {
      method: "POST",
      body: JSON.stringify({ rating: input.rating, comment: input.comment, tags: input.tags ?? [] }),
    },
  )
}

export function toggleHelpfulVote(reviewId: string) {
  return apiRequest<{ helpful: boolean; helpfulCount: number }>(
    `/reviews/${encodeURIComponent(reviewId)}/helpful`,
    { method: "PUT" },
  )
}
