"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon, ArrowDown01Icon, CheckIcon } from "@hugeicons/core-free-icons"

export interface SearchableSelectProps {
  label: string
  icon: any
  options: string[]
  value: string
  onChange: (value: string | null) => void
  placeholder?: string
  searchPlaceholder?: string
}

export function SearchableSelect({
  label,
  icon,
  options,
  value,
  onChange,
  placeholder = "Pilih...",
  searchPlaceholder = "Cari opsi...",
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  )

  const isSelectedDefault = !value || value === "Semua"

  return (
    <div className="flex flex-col gap-1.5 relative w-full">
      <label className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
        <HugeiconsIcon icon={icon} className="w-3.5 h-3.5 text-primary" />
        <span>{label}</span>
      </label>

      {/* Select Trigger Input Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full py-2.5 px-3 rounded-2xl bg-background border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
          !isSelectedDefault
            ? "border-primary/60 ring-2 ring-primary/10 text-foreground"
            : "border-border text-muted-foreground hover:border-border/80"
        }`}
      >
        <span className="truncate font-bold text-foreground">
          {isSelectedDefault ? placeholder : value}
        </span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0 ml-1 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute top-full left-0 right-0 mt-1.5 bg-card border border-border/90 rounded-2xl shadow-2xl z-50 p-2 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200 min-w-[200px]">
            {/* Search Input inside Dropdown */}
            <div className="relative flex items-center px-1">
              <HugeiconsIcon
                icon={Search01Icon}
                className="absolute left-3 w-3.5 h-3.5 text-muted-foreground pointer-events-none"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-background border border-border/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground font-medium"
                autoFocus
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 text-[10px] text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Scrollable Option Items */}
            <div className="max-h-48 overflow-y-auto custom-scrollbar flex flex-col gap-0.5 pt-1">
              {filteredOptions.length === 0 ? (
                <div className="py-3 px-2 text-center text-xs text-muted-foreground">
                  Tidak ada hasil
                </div>
              ) : (
                filteredOptions.map((opt) => {
                  const isCurrent = (value === opt) || (!value && opt === "Semua")
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        onChange(opt === "Semua" ? null : opt)
                        setIsOpen(false)
                        setSearch("")
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                        isCurrent
                          ? "bg-primary/10 text-primary font-bold"
                          : "hover:bg-accent hover:text-foreground text-muted-foreground"
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      {isCurrent && (
                        <HugeiconsIcon
                          icon={CheckIcon}
                          className="w-3.5 h-3.5 text-primary shrink-0"
                        />
                      )}
                    </button>
                  )
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
