import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@workspace/ui/lib/utils"

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-7xl",
      xl: "max-w-(--breakpoint-2xl)",
      full: "max-w-none",
    },
    padded: {
      none: "py-0",
      sm: "py-6 sm:py-8",
      md: "py-10 sm:py-16",
      lg: "py-16 sm:py-24",
    },
  },
  defaultVariants: {
    size: "lg",
    padded: "none",
  },
})

export interface ContainerProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType
}

const Container = React.forwardRef<HTMLElement, ContainerProps>(
  ({ className, size, padded, as: Component = "section", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(containerVariants({ size, padded, className }))}
        {...props}
      />
    )
  }
)

Container.displayName = "Container"

export { Container, containerVariants }
