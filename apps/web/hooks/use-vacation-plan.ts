"use client"

// Vacation Plan store - simpan festival & destinasi ke rencana liburan (klien, localStorage)

import { useCallback, useEffect, useState } from "react"

export interface VacationPlanItem {
  id: string
  type: "festival" | "destination"
  title: string
  location: string
  date?: string
  image?: string
  addedAt: number
}

const STORAGE_KEY = "voxlore_vacation_plan"

function loadPlan(): VacationPlanItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function savePlan(items: VacationPlanItem[]) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // quota / private mode - abaikan
  }
}

export function useVacationPlan() {
  const [items, setItems] = useState<VacationPlanItem[]>([])

  useEffect(() => {
    setItems(loadPlan())
  }, [])

  const addItem = useCallback((item: Omit<VacationPlanItem, "addedAt">) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === item.id)) return prev // hindari duplikasi
      const next = [...prev, { ...item, addedAt: Date.now() }]
      savePlan(next)
      return next
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((p) => p.id !== id)
      savePlan(next)
      return next
    })
  }, [])

  const isInPlan = useCallback(
    (id: string) => items.some((p) => p.id === id),
    [items]
  )

  const clearPlan = useCallback(() => {
    setItems([])
    savePlan([])
  }, [])

  return { items, addItem, removeItem, isInPlan, clearPlan }
}