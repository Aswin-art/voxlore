import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@workspace/ui/lib/utils"

export interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: typeof ArrowUpRight01Icon
  variant?: "white" | "dark"
}

export const ActionButton = React.forwardRef<
  HTMLButtonElement,
  ActionButtonProps
>(({ className, children, icon = ArrowUpRight01Icon, variant = "white", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group inline-flex items-center gap-1 select-none cursor-pointer border-0 bg-transparent p-0 outline-none",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "h-12 px-6 rounded-md font-bold text-sm shadow-xl transition-all flex items-center justify-center",
          variant === "white" && "bg-white text-[#1E2229] group-hover:bg-white/90",
          variant === "dark" && "bg-[#1E2229] text-white group-hover:bg-[#1E2229]/90 border border-white/10"
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          "w-12 h-12 rounded-md shadow-xl transition-all flex items-center justify-center shrink-0",
          variant === "white" && "bg-white text-[#1E2229] group-hover:bg-white/90",
          variant === "dark" && "bg-[#1E2229] text-white group-hover:bg-[#1E2229]/90 border border-white/10"
        )}
      >
        <HugeiconsIcon icon={icon} className="w-5 h-5" />
      </span>
    </button>
  )
})

ActionButton.displayName = "ActionButton"
