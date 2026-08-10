import { apiRequest, apiDelete } from "@/features/auth/data/api-client"
import type { CulturalFestival } from "@/lib/data"

export interface ApiTravelPlanItem {
  id: string
  travelPlanId: string
  festivalId: string
  festival: CulturalFestival
}

export interface ApiTravelPlan {
  id: string
  userId: string
  title: string
  province: string
  dateRange: string
  createdAt: string
  items: ApiTravelPlanItem[]
}

export interface CreateTravelPlanDto {
  title: string
  province: string
  dateRange: string
  festivalIds: string[]
}

export interface RecentPlanItem {
  id: string
  title: string
  province: string
  dateRangeStr: string
  eventsCount: number
  createdDate: string
  events: CulturalFestival[]
}

export function transformTravelPlan(plan: ApiTravelPlan): RecentPlanItem {
  return {
    id: plan.id,
    title: plan.title,
    province: plan.province,
    dateRangeStr: plan.dateRange,
    eventsCount: plan.items?.length ?? 0,
    createdDate: new Date(plan.createdAt).toLocaleDateString("id-ID"),
    events: plan.items?.map((item) => item.festival) ?? [],
  }
}

export async function fetchTravelPlans(): Promise<RecentPlanItem[]> {
  const plans = await apiRequest<ApiTravelPlan[]>("/travel-plans")
  if (!Array.isArray(plans)) return []
  return plans.map(transformTravelPlan)
}

export async function createTravelPlan(
  dto: CreateTravelPlanDto,
): Promise<RecentPlanItem> {
  const plan = await apiRequest<ApiTravelPlan>("/travel-plans", {
    method: "POST",
    body: JSON.stringify(dto),
  })
  return transformTravelPlan(plan)
}

export async function deleteTravelPlan(id: string): Promise<void> {
  await apiDelete(`/travel-plans/${id}`)
}

export async function removeTravelPlanItem(
  planId: string,
  festivalId: string,
): Promise<RecentPlanItem> {
  const plan = await apiRequest<ApiTravelPlan>(
    `/travel-plans/${planId}/items/${festivalId}`,
    { method: "DELETE" },
  )
  return transformTravelPlan(plan)
}
