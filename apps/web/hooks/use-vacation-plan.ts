"use client"

import { useCallback, useEffect, useState } from "react"
import { apiDelete, apiRequest } from "@/features/auth/data/api-client"

export interface VacationPlanItem {
  id: string
  type: "festival" | "destination"
  title: string
  location: string
  date?: string
  image?: string
  addedAt: number
}


export function useVacationPlan() {
  const [items, setItems] = useState<VacationPlanItem[]>([])

  useEffect(() => {
    void apiRequest<
      Array<{
        itemId: string
        itemType: VacationPlanItem["type"]
        title: string
        location: string
        date?: string
        image?: string
        addedAt: string
      }>
    >("/vacation-plan").then((stored) => {
      setItems(
        stored.map((item) => ({
          id: item.itemId,
          type: item.itemType,
          title: item.title,
          location: item.location,
          date: item.date,
          image: item.image,
          addedAt: Date.parse(item.addedAt),
        })),
      )
    }).catch((error) => {
      console.error("Gagal memuat rencana perjalanan", error)
    })
  }, [])

  const addItem = useCallback((item: Omit<VacationPlanItem, "addedAt">) => {
    void apiRequest<{ addedAt: string }>("/vacation-plan", {
      method: "POST",
      body: JSON.stringify(item),
    })
      .then((stored) => {
        setItems((prev) => {
          if (prev.some((p) => p.id === item.id && p.type === item.type)) return prev
          return [...prev, { ...item, addedAt: Date.parse(stored.addedAt) }]
        })
      })
      .catch((error) => console.error("Gagal menyimpan item rencana perjalanan", error))
  }, [])

  const removeItem = useCallback((id: string, type: VacationPlanItem["type"]) => {
    const previous = items
    setItems((current) => current.filter((p) => p.id !== id || p.type !== type))
    void apiDelete(`/vacation-plan/${encodeURIComponent(id)}?type=${encodeURIComponent(type)}`).catch((error) => {
      setItems(previous)
      console.error("Gagal menghapus item rencana perjalanan", error)
    })
  }, [items])

  const isInPlan = useCallback(
    (id: string, type: VacationPlanItem["type"]) => items.some((p) => p.id === id && p.type === type),
    [items]
  )

  const clearPlan = useCallback(() => {
    const previous = items
    setItems([])
    void apiDelete("/vacation-plan").catch((error) => {
      setItems(previous)
      console.error("Gagal menghapus rencana perjalanan", error)
    })
  }, [items])

  return { items, addItem, removeItem, isInPlan, clearPlan }
}