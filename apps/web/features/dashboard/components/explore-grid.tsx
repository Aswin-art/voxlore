"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Compass01Icon, Calendar01Icon } from "@hugeicons/core-free-icons"

export interface CategoryItem {
  id: string
  label: string
  description: string
  icon: typeof Compass01Icon
  isPrimary?: boolean
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "explore-culture",
    label: "Jelajahi Budaya",
    description: "Katalog candi, tradisi & cerita rakyat",
    icon: Compass01Icon,
    isPrimary: true,
  },
  {
    id: "explore-festivals",
    label: "Jelajahi Festival",
    description: "Atur perjalanan untuk ritual, pentas & acara adat",
    icon: Calendar01Icon,
    isPrimary: false,
  },
]

interface ExploreGridProps {
  onSelectCategory?: (categoryId: string) => void
}

export function ExploreGrid({ onSelectCategory }: ExploreGridProps) {
  return (
    <div className="p-4 sm:p-5 bg-card">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory?.(cat.id)}
            className={`flex flex-col items-start justify-between p-4 rounded-3xl border transition-all duration-200 cursor-pointer group text-left ${
              cat.isPrimary
                ? "bg-primary text-primary-foreground border-primary shadow-2xs hover:shadow-md"
                : "bg-background text-foreground border-border hover:bg-background/80"
            }`}
          >
            <div className="flex items-center justify-between w-full mb-3">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                  cat.isPrimary
                    ? "bg-white/10 text-white"
                    : "bg-card text-foreground shadow-2xs"
                }`}
              >
                <HugeiconsIcon icon={cat.icon} className="w-5 h-5 stroke-[2]" />
              </div>
              <span
                className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                  cat.isPrimary
                    ? "bg-white/15 text-white/90"
                    : "bg-primary/10 text-primary font-black"
                }`}
              >
                {cat.id === "explore-culture" ? "Warisan" : "Festival"}
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-extrabold tracking-tight leading-tight">
                {cat.label}
              </span>
              <span
                className={`text-[11px] leading-snug line-clamp-1 ${
                  cat.isPrimary ? "text-primary-foreground/75" : "text-muted-foreground"
                }`}
              >
                {cat.description}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// Backward compatibility alias export
export const CategoryGrid = ExploreGrid
